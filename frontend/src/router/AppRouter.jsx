import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from '../pages/home/Home.jsx';
import Shop from '../pages/shop/Shop.jsx';
import Checkout from '../pages/checkout/Checkout.jsx';
import PaymentEcocash from '../pages/paymentEcocash/PaymentEcocash.jsx';
import About from '../pages/about/About.jsx';
import Contact from '../pages/contact/Contact.jsx';
import NotFound from '../pages/notFound/NotFound.jsx';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment/ecocash" element={<PaymentEcocash />} />
      </Route>

      {/* Admin routes - protected */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
