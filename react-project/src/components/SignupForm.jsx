import React, { useState } from "react";
import "./SignupForm.css";

function SignupForm({ onSwitchToLogin, onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !confirmpassword ||
      !contactnumber ||
      !address
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6 || confirmpassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmpassword) {
      setError("Password and Confirm Password should be equal");
      return;
    }

    // Here you would typically make an API call to register the user
    // For now, we'll simulate a successful signup
    const userData = {
      email,
      id: Date.now(), // Simulated user ID
    };

    // Simulate API call
    setTimeout(() => {
      onSignupSuccess(userData);
      // Clear form
      setEmail("");
      setPassword("");
      // Switch to login view (handled by parent through onSignupSuccess)
    }, 500);
  };

  const handleGuestOrder = (e) => {
    e.preventDefault();
    // Handle guest order logic here
  };

  return (
    <div className="signup-container">
      <div className="avatar">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: "#004AAD" }}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </svg>
      </div>
      <h2>Sign up Here!</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            placeholder="Enter the number"
            value={contactnumber}
            onChange={(e) => setContactnumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            type="text"
            placeholder="Enter the address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Create Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <button type="submit" className="signup-button">
          Sign up
        </button>
        <button
          type="button"
          className="login-button"
          onClick={onSwitchToLogin}
        >
          Log in instead
        </button>
        <a href="#" className="guest-link" onClick={handleGuestOrder}>
          Order as Guest
        </a>
      </form>
    </div>
  );
}

export default SignupForm;
