import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BuySet from './components/BuySet';
import Contact from './components/Contact';
import NewProducts from './components/NewProducts';
import CheckoutPage from './components/CheckoutPage';
import CartPopup from './components/CartPopup';
import ShippingPaymentPage from './components/ShippingPaymentPage';
import UserProfile from './components/UserProfile';
import { CartProvider } from './context/CartContext';

function App() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleSwitchToLogin = () => {
    setIsLoginView(true);
  };

  const handleSwitchToSignup = () => {
    setIsLoginView(false);
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setIsLoginView(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar 
            onLoginClick={handleLoginClick} 
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            user={user}
          />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-products" element={<NewProducts />} />
            <Route path="/buy-set" element={<BuySet />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/shipping-payment" element={<ShippingPaymentPage />} />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <UserProfile user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
            />
          </Routes>
          
          <CartPopup />
          
          {showAuthModal && !isAuthenticated && (
            <div className="auth-modal-overlay" onClick={handleCloseModal}>
              <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={handleCloseModal}>×</button>
                {isLoginView ? (
                  <LoginForm 
                    onSwitchToSignup={handleSwitchToSignup}
                    onLoginSuccess={handleLoginSuccess}
                  />
                ) : (
                  <SignupForm 
                    onSwitchToLogin={handleSwitchToLogin}
                    onSignupSuccess={handleSignupSuccess}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 