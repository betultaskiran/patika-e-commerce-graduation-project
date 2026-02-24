import { Card, Image, Text, Group, ActionIcon, Rating } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import styles from "./FeaturesCard.module.css";
import { useState, useContext } from "react";
import { Context } from "../../App";
import { axiosClient } from "../axiosClient";

export function FeaturesCard({ product, handleProductClick }) {
  const [ratingValue, setRatingValue] = useState(product.rating || 0);
  const ctx = useContext(Context);

  const isFavorited = ctx.favorites.some((item) => item._id === product._id);

  const handleRatingChange = async (value) => {
    try {
      setRatingValue(value);
      await axiosClient.post(`/api/product/rate/${product._id}`, {
        rating: value,
      });
      notifications.show({
        title: "Teşekkürler!",
        message: "Puanınız kaydedildi.",
        color: "blue",
      });
    } catch (error) {
      console.error("Puanlama hatası detayı:", error);
      const errorMsg = error.response ?
        `Sunucu Hatası (${error.response.status}): ${error.response.data?.error || error.response.statusText}` :
        `Bağlantı Hatası: ${error.message}`;

      notifications.show({
        title: "Hata",
        message: errorMsg,
        color: "red",
      });
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Card'ın onClick'ini tetiklemesini engelle
    if (isFavorited) {
      ctx.setFavorites((prev) =>
        prev.filter((item) => item._id !== product._id)
      );
      notifications.show({
        title: "Favorilerden Çıkarıldı",
        message: `${product.productName} favorilerinizden çıkarıldı.`,
        color: "gray",
      });
    } else {
      ctx.setFavorites((prev) => [...prev, product]);
      notifications.show({
        title: "Favorilere Eklendi",
        message: `${product.productName} favorilerinize eklendi!`,
        color: "green",
      });
    }
  };

  return (
    <Card withBorder radius="md" className={styles.card}>
      {/* Product Image Section */}
      <Card.Section
        className={styles.imageSection}
        onClick={() => handleProductClick(product._id)}
      >
        <Image
          src={`http://localhost:3000${product.image}`}
          className={styles.productImage}
        />

        <ActionIcon
          className={styles.favoriteIcon}
          size="lg"
          radius="xl"
          onClick={handleFavoriteClick}
          variant={isFavorited ? "filled" : "outline"}
          color={isFavorited ? "red" : "gray"}
        >
          <IconHeart
            size={24}
            stroke={1.5}
            fill={isFavorited ? "red" : "none"}
          />
        </ActionIcon>
      </Card.Section>

      {/* Product Details Section */}
      <div
        className={styles.detailsSection}
        onClick={() => handleProductClick(product._id)}
      >
        {/* Product Name */}
        <Text fz="lg" fw={700} mt="md">
          {product.productName}
        </Text>

        {/* Rating Section */}
        <Group
          spacing={4}
          mt="xs"
          onClick={(e) => e.stopPropagation()} // Rating'e tıklandığında detaya gitmesin
        >
          <Rating value={ratingValue} onChange={handleRatingChange} />
          {product.ratingCount > 0 && (
            <Text size="xs" c="dimmed">
              ({product.ratingCount})
            </Text>
          )}
        </Group>

        {/* Price Section */}
        <Text fz="xl" fw={700} mt="sm">
          {product.price}$
        </Text>
      </div>
    </Card>
  );
}
