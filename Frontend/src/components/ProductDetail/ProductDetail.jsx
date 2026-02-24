// src/components/ProductDetail/ProductDetail.jsx
/*import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Paper, Container, Title, Text } from "@mantine/core";
import { axiosClient } from "../axiosClient";

const ProductDetail = () => {
  const params = useParams(); // URL parametresi olarak ürün ID'sini al
  const [product, setProduct] = useState(null); // Seçilen ürün bilgisi

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosClient.get(`/api/product/${params.id}`);
        setProduct(response.data.response);
      } catch (error) {
        console.error("Ürün detayları alınırken hata oluştu:", error);
        alert(
          "Ürün detayları alınırken bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <Container>
      {product ? (
        <Paper shadow="xs" padding="md">
          <Title order={1}>{product.name}</Title>
          <Text>{product.description}</Text>
          <Text>Fiyat: ${product.price}</Text>
          <Button variant="outline" color="green">
            Sepete Ekle
          </Button>
        </Paper>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </Container>
  );
};

export default ProductDetail;*/
// ProductDetail.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Paper, Container, Title, Text, Image } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { axiosClient } from "../axiosClient";
import styles from "./ProductDetail.module.css";
import { Context } from "../../App";

const ProductDetail = () => {
  const ctx = useContext(Context);
  const params = useParams(); // URL parametresi olarak ürün ID'sini al
  const [product, setProduct] = useState(null); // Seçilen ürün bilgisi
  const handleAddToBasket = () => {
    let basketItem = {
      productName: product.productName,
      price: product.price,
      productImage: product.image,
      quantity: 1,
      _id: product._id,
    };
    if (ctx.basket.some((item) => item._id == product._id)) {
      ctx.setBasket((prev) =>
        prev.map((item) => {
          if (item._id == product._id) {
            item.quantity += 1;
          }
          return item;
        })
      );
    } else {
      ctx.setBasket((prev) => [...prev, basketItem]);
    }

    notifications.show({
      title: "Başarılı",
      message: `${product.productName} sepete eklendi!`,
      color: "green",
    });
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosClient.get(`/api/product/${params.id}`);
        setProduct(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.error("Ürün detayları alınırken hata oluştu:", error);
        alert(
          "Ürün detayları alınırken bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    };

    fetchProductDetails();
  }, [params.id]);

  return (
    <Container>
      {product ? (
        <Paper shadow="xs" padding="md" className={styles.productDetail}>
          <div className={styles.imageContainer}>
            <Image
              src={"http://localhost:3000" + product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>
          <div className={styles.productInfo}>
            <Title order={1} className={styles.productName}>
              {product.productName}
            </Title>
            <Text className={styles.productDescription}>
              {product.description}
            </Text>
            <Text className={styles.productPrice}>
              Price: ${product.price}
              {"\u00A0\u00A0\u00A0"}Stock: {product.stock}
            </Text>
            <Button
              variant="outline"
              color="green"
              className={styles.addButton}
              onClick={handleAddToBasket}
            >
              Add to Cart
            </Button>
          </div>
        </Paper>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default ProductDetail;
