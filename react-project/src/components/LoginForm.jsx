import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if admin is already logged in
  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Admin login check
    if (isAdminLogin) {
      // In a real app, this would be an API call to authenticate admin
      if (email === "admin@misaki.com" && password === "admin123") {
        const adminData = {
          email,
          id: "admin-1",
          isAdmin: true,
        };
        
        // Store admin data in localStorage
        localStorage.setItem('adminData', JSON.stringify(adminData));
        
        // Redirect to admin dashboard
        onLoginSuccess();
        navigate('/admin');
        return;
      } else {
        setError("Invalid admin credentials");
        return;
      }
    }

    // Regular user login
    // Here you would typically make an API call to authenticate the user
    // For now, we'll simulate a successful login
    const userData = {
      email,
      id: Date.now(), // Simulated user ID
    };

    // Simulate API call
    setTimeout(() => {
      onLoginSuccess(userData);
      // Clear form
      setEmail("");
      setPassword("");
    }, 500);
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setError("");
  };

  return (
    <div className="login-container">
      <div className="avatar">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: isAdminLogin ? "#FF4500" : "#004AAD" }}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      </div>
      <h2>{isAdminLogin ? "Admin Login" : "User Login"}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder={isAdminLogin ? "Admin Email" : "Enter Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={isAdminLogin ? "Admin Password" : "Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </div>
        <button type="submit" className="login-submit-button">
          {isAdminLogin ? "Admin Login" : "User Login"}
        </button>
        {!isAdminLogin && (
          <button
            type="button"
            className="signup-switch-button"
            onClick={onSwitchToSignup}
          >
            Sign up instead
          </button>
        )}
        {!isAdminLoggedIn && (
          <button 
            type="button" 
            className="admin-toggle-button"
            onClick={toggleAdminLogin}
          >
            {isAdminLogin ? "Switch to User Login" : "Switch to Admin Login"}
          </button>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
