import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Notification,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { axiosClient } from "../axiosClient.jsx";
import { useContext } from "react";
import { Context } from "../../App";

function Register() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: (value) =>
        value.trim().length < 2
          ? "Username must be at least 2 characters"
          : null,
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const ctx = useContext(Context);

  const handleRegister = async (values) => {
    try {
      const response = await axiosClient.post("api/auth/register", values);
      if (
        response.status === 200 &&
        response.data.response.message === "success"
      ) {
        const { user, token } = response.data.response;

        ctx.setUser(user);
        localStorage.setItem("token", token);

        notifications.show({
          title: "Başarılı",
          message:
            "Hesabınız oluşturuldu ve giriş yapıldı! Hoş geldiniz, " +
            user.username,
          color: "green",
        });
        navigate("/");
      } else {
        notifications.show({
          title: "Hata",
          message: response.data.response?.message || "Kayıt başarısız.",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Register hatası:", error);
      notifications.show({
        title: "Hata",
        message:
          error.response?.data?.message ||
          "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.",
        color: "red",
      });
    }
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} align="center">
          Register
        </Title>
        <form onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required
            {...form.getInputProps("username")}
          />
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
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <Group position="center" mt="xl">
            <Button type="submit" variant="filled" color="blue">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
