import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomAppShell from "./CustomAppShell.jsx";
import Home from "./pages/Home.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import AboutPage from "./components/AboutPage/AboutPage.jsx";
import ProductsPage from "./components/ProductsPage/ProductsPage.jsx";
import AdminPage from "./components/AdminPage/AdminPage.jsx";
import CustomAppShellOth from "./CustomAppShellOth.jsx";
import AddItemsPage from "./Admin/Navbar/AddItemsPage.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import UpdateItemPage from "./Admin/Navbar/UpdateItemPage.jsx";
import ListItemsPage from "./Admin/Navbar/ListItemPage.jsx";
import ListItemsCategories from "./Admin/Navbar/ListCategoryPage.jsx";
import ListItemsBrands from "./Admin/Navbar/ListBrandPage.jsx";
import ProductDetail from "./components/ProductDetail/ProductDetail.jsx";
import UpdateCategory from "./Admin/Navbar/UpdateCategory.jsx";
import UpdateBrands from "./Admin/Navbar/UpdateBrands.jsx";
import { createContext, useEffect, useState } from "react";
import MyCard from "./components/MyCard/MyCard.jsx";
import Favorites from "./pages/Favorites.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
export const Context = createContext();
const ContextProvider = (props) => {
  const [search, setSearch] = useState("");

  // Initialize basket, favorites and user from localStorage if they exist
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage whenever basket, favorites or user change
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return (
    <Context.Provider
      value={{
        search,
        setSearch,
        basket,
        setBasket,
        favorites,
        setFavorites,
        user,
        setUser,
        logout,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default function App() {
  return (
    <ContextProvider>
      <MantineProvider>
        <Notifications position="top-right" zIndex={2000} />
        <BrowserRouter>
          <Routes>
            <Route element={<CustomAppShell></CustomAppShell>}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/about" element={<AboutPage />}></Route>
              <Route path="/contact" element={<ContactUs />}></Route>
              <Route path="/products" element={<ProductsPage />}></Route>
              <Route path="/product/:id" element={<ProductDetail />}></Route>
              <Route path="/my-cart" element={<MyCard />}></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />}></Route>
              </Route>
            </Route>
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route
                path="/admin"
                element={<CustomAppShellOth></CustomAppShellOth>}
              >
                <Route path="add-items" element={<AddItemsPage />}></Route>
                <Route path="list-items" element={<ListItemsPage />}></Route>
                <Route
                  path="list-categories"
                  element={<ListItemsCategories />}
                ></Route>
                <Route
                  path="update-items/:id"
                  element={<UpdateItemPage />}
                ></Route>
                <Route
                  path="update-category/:id"
                  element={<UpdateCategory />}
                ></Route>
                <Route
                  path="update-category"
                  element={<UpdateCategory />}
                ></Route>
                <Route path="list-brands" element={<ListItemsBrands />}></Route>
                <Route
                  path="update-items/:id"
                  element={<UpdateItemPage />}
                ></Route>
                <Route path="update-brand" element={<UpdateBrands />}></Route>
                <Route
                  path="update-brand/:id"
                  element={<UpdateBrands />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ContextProvider>
  );
}
