import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useContext, useState } from "react";
import { axiosClient } from "../axiosClient";
import { Context } from "../../App";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const [notification, setNotification] = useState(null);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters long" : null,
    },
  });

  const handleLoginForm = async (values) => {
    try {
      const response = await axiosClient.post("/api/auth/login", values);

      if (response.status === 200 && response.data.response.message === "success") {
        const { user, token } = response.data.response;

        ctx.setUser(user);
        localStorage.setItem("token", token);

        navigate("/");
        notifications.show({
          title: "Başarılı",
          message: "Giriş yapıldı!",
          color: "green",
        });
      } else {
        setNotification({
          title: "Hata",
          message: response.data.response?.message || "Geçersiz e-posta veya şifre",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Login hatası:", error);
      setNotification({
        title: "Hata",
        message: "Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.",
        color: "red",
      });
    }
  };

  return (
    <Container size="xs" className={styles.loginContainer}>
      <Paper radius="md" w={"100%"} p="xl" withBorder>
        <Title order={2} align="center">
          Login
        </Title>
        {notification && (
          <Notification
            color={notification.color}
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        )}
        <form onSubmit={form.onSubmit(handleLoginForm)}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor component="button" type="button" color="blue">
              Forgot password?
            </Anchor>
          </Group>
          <Group position="center" mt="xl">
            <Button type="submit" variant="filled" color="blue">
              Login
            </Button>
          </Group>
        </form>
        <Group position="center" mt="md">
          <Anchor
            component="button"
            type="button"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Register
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
}

export default Login;
