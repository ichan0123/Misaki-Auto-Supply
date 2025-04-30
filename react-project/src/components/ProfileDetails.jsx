import React, { useState } from 'react';
import './ProfileDetails.css';

function ProfileDetails({ user }) {
  // Default user data if not provided
  const defaultUser = {
    firstname: 'Juan',
    lastname: 'Dela Cruz',
    email: 'juandc@gmail.com',
    phone: '09123456789'
  };

  const userData = user || defaultUser;
  
  const [formData, setFormData] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    phone: userData.phone
  });
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the user's profile
    // For now, we'll simulate a successful update
    setTimeout(() => {
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }, 500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    
    // Basic validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Please fill in all password fields');
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    
    // Here you would typically make an API call to update the user's password
    // For now, we'll simulate a successful update
    setTimeout(() => {
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="profile-details">
      <h3>Personal Information</h3>
      
      <form onSubmit={handleProfileSubmit} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-button">Save Details</button>
          {profileSuccess && <span className="success-message">Profile updated successfully!</span>}
        </div>
      </form>
      
      <h3>Change Password</h3>
      
      <form onSubmit={handlePasswordSubmit} className="password-form">
        {passwordError && <div className="error-message">{passwordError}</div>}
        
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Repeat New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-button">Save Password</button>
          {passwordSuccess && <span className="success-message">Password updated successfully!</span>}
        </div>
      </form>
    </div>
  );
}

export default ProfileDetails;
