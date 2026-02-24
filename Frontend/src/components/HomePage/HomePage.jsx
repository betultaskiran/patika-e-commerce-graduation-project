/*import React from "react";
import { CardsCarousel } from "../Carousel/CardsCarousel";
import { FeaturesCard } from "../Card/FeaturesCard";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <div className={styles.carouselContainer}>
        <CardsCarousel />
      </div>
      <header className={styles.header}>
        <h1>LATEST COLLECTIONS</h1>
      </header>
      <div className={styles.gridContainer}>
        {/* <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard /> }
      </div>
    </>
  );
}

export default HomePage;*/
import React, { useState, useEffect, useContext } from "react";
import { SimpleGrid, Container } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { CardsCarousel } from "../Carousel/CardsCarousel";
import { FeaturesCard } from "../Card/FeaturesCard";
import styles from "./HomePage.module.css";
import { axiosClient } from "../axiosClient";
import { Context } from "../../App";

function HomePage() {
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State for loading status

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Fetch products when page loads
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const params = {
          search: ctx.search ? ctx.search : undefined,
          isPublic: true, // Assuming you're fetching only public products
        };
        const response = await axiosClient.get("api/product", {
          params: params,
        });
        setProducts(response.data.response); // Update products with fetched data
      } catch (error) {
        console.error("Ürünler çekilirken hata oluştu:", error);
        alert("Ürünler çekilirken bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    getProducts();
  }, [ctx.search]); // Run on search change or initial load

  return (
    <>
      <div className={styles.carouselContainer}>
        <CardsCarousel />
      </div>
      <header className={styles.header}>
        <h2>LATEST COLLECTIONS</h2>
      </header>
      <div className={styles.gridContainer}>
        {loading ? (
          <p>Yükleniyor...</p> // Loading text
        ) : products.length > 0 ? (
          <Container fluid>
            <SimpleGrid cols={3} spacing="lg">
              {products.map((product) => (
                <FeaturesCard
                  key={product._id}
                  product={product} // Pass the product to the card component
                  handleProductClick={handleProductClick}
                />
              ))}
            </SimpleGrid>
          </Container>
        ) : (
          <p>Ürün bulunamadı.</p> // No products found message
        )}
      </div>
    </>
  );
}

export default HomePage;
