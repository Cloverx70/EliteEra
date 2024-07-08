import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MainLogin from "./pages/LoginSignup/MainLogin";
import HomePage from "./pages/HomePage/HomePage";
import Contactus from "./pages/ContactUs/ContactUs";
import { Toaster } from "react-hot-toast";
import Navbar from "./shared/Navbar";
import Products from "./pages/Products/Products";
import Collections from "./pages/Collections/Collections";
import { useStatus } from "./contexts/statusContext";
import ProductPage from "./pages/ProductPage/ProductPage";
import AdminPage from "./pages/AdminD/AdminPage";
import MainCheckout from "./pages/Checkout/MainCheckout";
import Footer from "./shared/Footer";
import CheckoutScreensNav from "./pages/Checkout/checkoutScreensNav/CheckoutScreensNav";
import ThankYou from "./pages/ThankYou/ThankYou";
import Categories from "./pages/Categories/Categories";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderHistoryComponentPage from "./pages/OrderHistory/Pages/OrderHistoryComponentPage";
import Profile from "./pages/Profile/Profile";

const App = () => {
  const location = useLocation();
  const { statusPending, statusLoading } = useStatus();

  const footerBgColor =
    location.pathname === "/" ? "" : "bg-custom-light-purple border-none";

  return (
    <>
      {location.pathname === "/login" ||
      /^\/orderhistory\/\d+$/.test(location.pathname) ||
      location.pathname === "/orderhistory" ||
      location.pathname === "/profile" ? (
        ""
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/checkout" element={<MainCheckout />} />
        <Route
          path="/checkout/:pmethod/:checkoutid"
          element={<CheckoutScreensNav />}
        />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/category/:name" element={<Categories />} />
        <Route path="/orderhistory" element={<OrderHistory />} />

        <Route
          path="/orderhistory/:checkoutid"
          element={<OrderHistoryComponentPage />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {location.pathname === "/admin" ||
      location.pathname === "/login" ||
      statusLoading ? (
        ""
      ) : (
        <Footer bgColorAndBorder={footerBgColor} />
      )}
    </>
  );
};

export default App;
