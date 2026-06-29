import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from '../pages/home/Home.jsx';
import Shop from '../pages/shop/Shop.jsx';
import ProductDetails from '../pages/product/ProductDetails.jsx';
import Cart from '../pages/cart/Cart.jsx';
import Checkout from '../pages/checkout/Checkout.jsx';
import PaymentEcocash from '../pages/paymentEcocash/PaymentEcocash.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import Profile from '../pages/profile/Profile.jsx';
import MyOrders from '../pages/orders/MyOrders.jsx';
import About from '../pages/about/About.jsx';
import Contact from '../pages/contact/Contact.jsx';
import NotFound from '../pages/notFound/NotFound.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminProducts from '../pages/admin/AdminProducts.jsx';
import AdminOrders from '../pages/admin/AdminOrders.jsx';
import AdminUsers from '../pages/admin/AdminUsers.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment/ecocash/:orderId" element={<PaymentEcocash />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin routes - protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
