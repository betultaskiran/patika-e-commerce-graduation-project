import React, { useContext } from "react";
import { Container, Title, SimpleGrid, Text, Paper, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { FeaturesCard } from "../components/Card/FeaturesCard";
import { Context } from "../App";

const Favorites = () => {
    const ctx = useContext(Context);
    const navigate = useNavigate();

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <Container size="lg" py="xl">
            <Title order={2} mb="xl" style={{ textAlign: "center", color: "#034657" }}>
                Favorilerim
            </Title>

            {ctx.favorites.length > 0 ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                    {ctx.favorites.map((product) => (
                        <FeaturesCard
                            key={product._id}
                            product={product}
                            handleProductClick={handleProductClick}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Paper shadow="xs" p="xl" withBorder style={{ textAlign: "center" }}>
                    <Text size="lg" mb="md">
                        Henüz favori ürününüz yok.
                    </Text>
                    <Button
                        variant="light"
                        color="teal"
                        onClick={() => navigate("/products")}
                    >
                        Ürünlere Göz At
                    </Button>
                </Paper>
            )}
        </Container>
    );
};

export default Favorites;
