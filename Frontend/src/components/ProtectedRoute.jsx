import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../App";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user } = useContext(Context);
  const token = localStorage.getItem("token");

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Sadece admin erişimi isteniyorsa ve kullanıcı admin değilse ana sayfaya yönlendir
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Şartlar sağlanıyorsa alt rotaları (child routes) göster
  return <Outlet />;
};

export default ProtectedRoute;
