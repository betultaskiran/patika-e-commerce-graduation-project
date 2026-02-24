import styles from "./MyCard.module.css";
import { useContext } from "react";
import { Context } from "../../App";
import { Button, Text, Group, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function MyCard() {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const calculate = () => {
    let totalValue = 0;
    if (ctx.basket.length > 0) {
      ctx.basket.forEach((item) => {
        let totalPrice = item.price * item.quantity;
        totalValue += totalPrice;
      });
    }
    return totalValue;
  };

  const handleCheckout = () => {
    if (ctx.user) {
      navigate("/checkout");
    } else {
      notifications.show({
        title: "Giriş Gerekli",
        message: "Alışverişi tamamlamak için lütfen giriş yapın.",
        color: "orange",
      });
      navigate("/login");
    }
  };

  return (
    <div className={styles.myCard}>
      <Stack spacing="xl">
        <Text size="xl" fw={700} style={{ color: "#034657" }}>
          Alışveriş Sepetim
        </Text>

        <div className={styles.productsGrid}>
          <div className={styles.gridItemHeader}>
            <div>Ürün</div>
            <div>İsim</div>
            <div>Adet</div>
            <div>Fiyat</div>
          </div>
          {ctx.basket.length > 0 ? (
            ctx.basket.map((item) => (
              <div className={styles.gridItem} key={item._id}>
                <img
                  className={styles.gridItemImage}
                  src={"http://localhost:3000" + item.productImage}
                  width={50}
                  alt={item.productName}
                />
                <div className={styles.gridItemTitle}>{item.productName}</div>
                <div className={styles.gridItemQuantity}>{item.quantity}</div>
                <div className={styles.gridItemPrice}>${item.price}</div>
              </div>
            ))
          ) : (
            <div style={{ padding: "20px", textAlign: "center" }}>
              Sepetiniz şu an boş.
            </div>
          )}
          {ctx.basket.length > 0 && (
            <div className={styles.gridItemFooter}>
              <Text size="lg" fw={700}>
                TOPLAM: ${calculate()}
              </Text>
            </div>
          )}
        </div>

        {ctx.basket.length > 0 && (
          <Group position="right">
            <Button
              size="lg"
              color="teal"
              onClick={handleCheckout}
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            >
              Satın Al
            </Button>
          </Group>
        )}

        {ctx.basket.length === 0 && (
          <Button
            variant="light"
            onClick={() => navigate("/products")}
            style={{ alignSelf: "center" }}
          >
            Alışverişe Başla
          </Button>
        )}
      </Stack>
    </div>
  );
}
