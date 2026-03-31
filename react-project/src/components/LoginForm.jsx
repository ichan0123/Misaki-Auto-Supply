import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

// Mock credentials
const MOCK_ADMIN = { email: 'admin@misaki.com', password: 'admin123' };
const MOCK_USERS = [
  { id: 1, email: 'user@email.com', password: 'user123', firstname: 'Juan', lastname: 'Dela Cruz' }
];

function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) setIsAdminLoggedIn(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (isAdminLogin) {
        if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
          const adminData = { email: MOCK_ADMIN.email, name: 'Admin' };
          localStorage.setItem('adminData', JSON.stringify(adminData));
          navigate('/admin');
        } else {
          setError("Invalid admin credentials. Use admin@misaki.com / admin123");
        }
      } else {
        // Check registered users from localStorage too
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const allUsers = [...MOCK_USERS, ...registeredUsers];
        const user = allUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userData = { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname };
          localStorage.setItem('userData', JSON.stringify(userData));
          onLoginSuccess(userData);
        } else {
          setError("Invalid email or password.");
        }
      }
      setIsLoading(false);
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
        <button type="submit" className="login-submit-button" disabled={isLoading}>
          <span className="button-icon">🚀</span>
          {isLoading ? 'Logging in...' : (isAdminLogin ? "Login as Admin" : "Login")}
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
