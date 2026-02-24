import React, { useContext } from "react";
import { Container, Paper, Title, Text, Button, Stack, Group, Divider, Stepper } from "@mantine/core";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import { IconCreditCard, IconTruck, IconCheck } from "@tabler/icons-react";

const Checkout = () => {
    const { basket, user } = useContext(Context);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return basket.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <Container size="md" py="xl">
            <Title order={2} mb="xl" align="center" style={{ color: "#034657" }}>
                Ödeme ve Teslimat
            </Title>

            <Stepper active={1} breakpoint="sm" mb="xl">
                <Stepper.Step label="Sepet" description="Ürünleri kontrol et" icon={<IconCheck size={18} />}></Stepper.Step>
                <Stepper.Step label="Ödeme" description="Ödeme Bilgileri" icon={<IconCreditCard size={18} />}></Stepper.Step>
                <Stepper.Step label="Onay" description="Sipariş Tamamlandı" icon={<IconTruck size={18} />}></Stepper.Step>
            </Stepper>

            <Group grow align="flex-start">
                <Stack spacing="md">
                    <Paper shadow="xs" p="xl" withBorder>
                        <Title order={4} mb="md">Teslimat Bilgileri</Title>
                        <Text size="sm"><b>Alıcı:</b> {user?.username}</Text>
                        <Text size="sm"><b>E-posta:</b> {user?.email}</Text>
                        <Text size="sm" c="dimmed" mt="sm">
                            (Bu bir demo projesidir. Gerçek bir gönderim yapılmayacaktır.)
                        </Text>
                    </Paper>

                    <Paper shadow="xs" p="xl" withBorder>
                        <Title order={4} mb="md">Ödeme Yöntemi</Title>
                        <Text size="sm">Kredi Kartı / Banka Kartı</Text>
                        <Divider my="sm" />
                        <Text size="xs" c="dimmed">
                            Ödeme alt yapısı şu an aktif değildir. Bu sayfa tasarım amaçlıdır.
                        </Text>
                    </Paper>
                </Stack>

                <Paper shadow="md" p="xl" withBorder style={{ maxWidth: "350px" }}>
                    <Title order={4} mb="md">Sipariş Özeti</Title>
                    <Stack spacing="xs">
                        {basket.map((item) => (
                            <Group position="apart" key={item._id}>
                                <Text size="sm">{item.productName} (x{item.quantity})</Text>
                                <Text size="sm">${item.price * item.quantity}</Text>
                            </Group>
                        ))}
                    </Stack>
                    <Divider my="md" />
                    <Group position="apart">
                        <Text fw={700}>Toplam Tutar:</Text>
                        <Title order={3} color="teal">${calculateTotal()}</Title>
                    </Group>
                    <Button fullWidth mt="xl" color="teal" size="lg" onClick={() => alert("Bu bir demo projesidir. Sipariş tamamlama fonksiyonu yakında eklenecektir.")}>
                        Siparişi Onayla
                    </Button>
                    <Button variant="subtle" fullWidth mt="sm" onClick={() => navigate("/my-cart")}>
                        Sepete Geri Dön
                    </Button>
                </Paper>
            </Group>
        </Container>
    );
};

export default Checkout;
