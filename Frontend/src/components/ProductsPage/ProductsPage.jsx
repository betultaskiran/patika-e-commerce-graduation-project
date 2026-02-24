import React, { useState, useEffect, useContext } from "react"; //şuanki kod
import { Grid, SimpleGrid, Container } from "@mantine/core";
import { FeaturesCard } from "../Card/FeaturesCard";
import styles from "./ProductsPage.module.css";
import { axiosClient } from "../axiosClient";
import Filters from "../Filters/Filters";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
const ProductsPage = () => {
  const ctx = useContext(Context);
  const [products, setProducts] = useState([]); // Tüm ürünler
  const [loading, setLoading] = useState(true); // Loading durumu
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const navigate = useNavigate(); // Yönlendirme işlevi için kullan
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  // Sayfa yüklendiğinde tüm ürünleri çek
  useEffect(() => {
    getProducts();
  }, []);
  // Kategori değiştiğinde filtreleme
  const handleCategoryChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat != id));
    } else {
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  // Marka değiştiğinde filtreleme
  const handleBrandChange = (id) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands((prev) => prev.filter((brand) => brand != id));
    } else {
      setSelectedBrands((prev) => [...prev, id]);
    }
  };

  // Fiyat aralığı değiştiğinde filtreleme
  const handlePriceRangeChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPriceRange((prev) =>
      checked ? [...prev, name] : prev.filter((range) => range !== name)
    );
  };
  const getProducts = async () => {
    try {
      setLoading(true); // Loading durumu aktif edildi
      const params = {
        search: ctx.search ? ctx.search : undefined,
        categoryIds:
          selectedCategories.length > 0
            ? selectedCategories.join(",")
            : undefined,
        brandIds:
          selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
        priceRanges:
          selectedPriceRange.length > 0
            ? selectedPriceRange.join(",")
            : undefined,
      };
      const [response, response2, response3] = await Promise.all([
        axiosClient.get("api/product", {
          params: params,
        }),
        axiosClient.get("api/category"),
        axiosClient.get("api/brand"),
      ]);
      setCategoryList(response2);
      setBrandList(response3);
      setProducts(response.data.response);
    } catch (error) {
      console.error("Ürünler çekilirken hata oluştu:", error);
      alert("Ürünler çekilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false); // Veriler alındıktan sonra yükleme durumu false
    }
  };
  // Ürünleri filtreleme
  useEffect(() => {
    getProducts();
  }, [selectedCategories, selectedBrands, selectedPriceRange, ctx.search]);

  // Ürün detay sayfasına yönlendirme
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Grid gutter="md" className={styles.container}>
      <Grid.Col span={2}>
        <Filters
          brands={brandList}
          categories={categoryList}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          selectedBrands={selectedBrands}
          handleBrandChange={handleBrandChange}
          selectedPriceRange={selectedPriceRange}
          handlePriceRangeChange={handlePriceRangeChange}
        />
      </Grid.Col>
      <Grid.Col span={10}>
        <Container fluid>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : products.length > 0 ? (
            <SimpleGrid cols={3} spacing="lg">
              {products.map((product) => (
                <FeaturesCard
                  key={product._id}
                  product={product}
                  handleProductClick={handleProductClick}
                /> // Her bir ürün kartı tıklama işlevi eklenir
              ))}
            </SimpleGrid>
          ) : (
            <p>Ürün bulunamadı.</p>
          )}
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default ProductsPage;
