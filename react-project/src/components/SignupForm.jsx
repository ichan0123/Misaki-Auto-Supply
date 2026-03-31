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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password || !firstname || !lastname || !confirmpassword || !contactnumber || !address) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password.length < 6 || confirmpassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      setError("Password and Confirm Password should be equal");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // Save to localStorage as registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find(u => u.email === email);
      if (existingUser) {
        setError("Email already registered. Please login instead.");
        setIsLoading(false);
        return;
      }

      const newUser = { id: Date.now(), email, password, firstname, lastname, contactnumber, address };
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      const userData = { id: newUser.id, email, firstname, lastname };
      localStorage.setItem('userData', JSON.stringify(userData));

      setEmail(""); setFirstname(""); setLastname("");
      setContactnumber(""); setAddress(""); setPassword(""); setConfirmPassword("");

      onSignupSuccess(userData);
      setIsLoading(false);
    }, 500);
  };

  const handleGuestOrder = (e) => {
    e.preventDefault();
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

        <div
          className="form-container"
          style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
        >
          <div className="form-group" style={{ flex: "1 1 45%" }}>
            <label>First Name:</label>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Enter First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: "1 1 45%" }}>
            <label>Last Name:</label>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Enter Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: "1 1 45%" }}>
            <label>Contact Number:</label>
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Enter the number"
              value={contactnumber}
              onChange={(e) => setContactnumber(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: "1 1 45%" }}>
            <label>Address:</label>
            <textarea
              style={{ width: "100%" }}
              placeholder="Enter the address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: "1 1 45%" }}>
            <label>Email:</label>
            <input
              style={{ width: "100%" }}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ flex: "1 1 45%" }}>
            <label>Create Password:</label>
            <input
              style={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              style={{ width: "100%", marginTop: "10px" }}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="show-password" style={{ marginTop: "10px" }}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="showPassword" style={{ marginLeft: "5px" }}>
                Show Password
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="signup-button" disabled={isLoading}>
          <span className="button-icon">🚀</span>
          {isLoading ? 'Creating Account...' : 'Create Account'}
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
