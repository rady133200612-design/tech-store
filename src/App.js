import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/AddProduct';
import CartPage from './components/CartPage';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Invoice from './components/Invoice';
import Wishlist from './components/Wishlist'; // صفحة جديدة

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // حالة المفضلة
  const [isAuth, setIsAuth] = useState(false);

  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);
  
  // دالة إضافة/حذف من المفضلة
  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', direction: 'rtl', backgroundColor: '#f8fafc' }}>
        <Sidebar wishlistCount={wishlist.length} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Navbar cartCount={cart.length} />
          <main style={{ padding: '30px', overflowY: 'auto', flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />} />
              <Route path="/wishlist" element={<Wishlist wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />} />
              <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              <Route path="/admin" element={isAuth ? <AdminDashboard /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;