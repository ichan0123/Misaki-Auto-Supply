import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import CarModelProducts from './components/CarModelProducts';
import AdminDashboard from './components/AdminDashboard';
import { CartProvider } from './context/CartContext';

// Layout component that conditionally renders the Navbar
const Layout = ({ children, isAuthenticated, user, onLoginClick, onLogout }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin' || location.pathname.startsWith('/admin/');
  
  return (
    <>
      {!isAdminPage && (
        <Navbar 
          onLoginClick={onLoginClick} 
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
          user={user}
        />
      )}
      {children}
      {!isAdminPage && <CartPopup />}
    </>
  );
};

function App() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleSwitchToLogin = () => {
    setIsLoginView(true);
  };

  const handleSwitchToSignup = () => {
    setIsLoginView(false);
  };

  const handleLoginClick = () => {
    // Don't show login modal if admin is already logged in
    if (isAdminLoggedIn) {
      window.location.href = '/admin';
      return;
    }
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
    // Also clear admin data if present
    localStorage.removeItem('adminData');
    setIsAdminLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/*" element={
              <Layout 
                isAuthenticated={isAuthenticated} 
                user={user} 
                onLoginClick={handleLoginClick} 
                onLogout={handleLogout}
              >
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
                  <Route path="/car-parts/:brand/:model" element={<CarModelProducts />} />
                  <Route path="/category/:categoryName" element={<CarModelProducts />} />
                  <Route path="/brand/:brandName" element={<CarModelProducts />} />
                  <Route path="/product/:productId" element={<CarModelProducts />} />
                </Routes>
              </Layout>
            } />
          </Routes>
          
          {showAuthModal && !isAuthenticated && !isAdminLoggedIn && (
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