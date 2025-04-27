import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

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
      setEmail('');
      setPassword('');
    }, 500);
  };

  const handleGuestOrder = (e) => {
    e.preventDefault();
    // Handle guest order logic here
  };

  return (
    <div className="login-container">
      <div className="avatar">
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#004AAD' }}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        <button type="submit" className="login-submit-button">Log in</button>
        <button type="button" className="signup-switch-button" onClick={onSwitchToSignup}>
          Sign up instead
        </button>
        <a href="#" className="guest-link" onClick={handleGuestOrder}>
          Order as Guest
        </a>
      </form>
    </div>
  );
}

export default LoginForm; 