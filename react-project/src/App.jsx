import React, { useState } from 'react';
import './App.css';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

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
    setIsLoginView(true); // Switch to login view after successful signup
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
    <div className="app">
      <Navbar 
        onLoginClick={handleLoginClick} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        user={user}
      />
      <HomePage />
      
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
  );
}

export default App; 