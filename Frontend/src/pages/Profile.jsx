import React, { useContext } from "react";
import { Container, Paper, Title, Text, Group, Avatar, Button, Divider, Stack } from "@mantine/core";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import { IconUser, IconMail, IconSettings, IconLogout } from "@tabler/icons-react";

const Profile = () => {
    const { user, logout } = useContext(Context);
    const navigate = useNavigate();

    if (!user) {
        return (
            <Container size="sm" py="xl">
                <Paper shadow="xs" p="xl" withBorder style={{ textAlign: "center" }}>
                    <Title order={2} mb="md">Giriş Yapılmadı</Title>
                    <Text mb="lg">Profilinizi görüntülemek için lütfen giriş yapın.</Text>
                    <Button onClick={() => navigate("/login")}>Giriş Yap</Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container size="sm" py="xl">
            <Paper shadow="md" radius="lg" p="xl" withBorder style={{ backgroundColor: '#fdfdfd' }}>
                <Stack spacing="xl">
                    <Group direction="column" align="center" spacing="xs">
                        <Avatar size={100} radius={100} color="teal">
                            {user.username.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Title order={2}>{user.username}</Title>
                        <Text c="dimmed">{user.role === 'admin' ? 'Yönetici' : 'Müşteri'}</Text>
                    </Group>

                    <Divider />

                    <Stack spacing="md">
                        <Group noWrap>
                            <IconUser size={20} stroke={1.5} color="gray" />
                            <Text size="sm"><b>Kullanıcı Adı:</b> {user.username}</Text>
                        </Group>
                        <Group noWrap>
                            <IconMail size={20} stroke={1.5} color="gray" />
                            <Text size="sm"><b>E-posta:</b> {user.email}</Text>
                        </Group>
                        <Group noWrap>
                            <IconSettings size={20} stroke={1.5} color="gray" />
                            <Text size="sm"><b>Hesap Tipi:</b> {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}</Text>
                        </Group>
                    </Stack>

                    <Divider />

                    <Group position="apart">
                        <Button variant="light" color="blue" leftIcon={<IconSettings size={18} />}>
                            Bilgilerimi Düzenle
                        </Button>
                        <Button
                            variant="outline"
                            color="red"
                            leftIcon={<IconLogout size={18} />}
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                        >
                            Çıkış Yap
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Profile;
