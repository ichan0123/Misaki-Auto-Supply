import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import ProfileHistory from './ProfileHistory';
import ProfileDetails from './ProfileDetails';
import ProfileAddress from './ProfileAddress';

function UserProfile({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('history');
  const navigate = useNavigate();

  // Mock order history data
  const orderHistory = [
    {
      id: 1,
      date: 'February 24, 2026',
      items: [
        { id: 1, name: 'Road Fit Pipe', quantity: 1 },
        { id: 2, name: 'Vortex Exhaust Bent Pipe', quantity: 1 },
        { id: 3, name: 'MagnaFlow Performance Exhaust Tailpipe 15395', quantity: 1 }
      ],
      total: 1960.00,
      status: 'Delivered',
      paymentMethod: 'Cash on Delivery'
    }
  ];

  // Handle delete profile confirmation
  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      // Here you would typically make an API call to delete the user's profile
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h2>{user?.firstname || 'Juan'} {user?.lastname || 'Dela Cruz'}</h2>
        <button className="logout-button" onClick={onLogout}>
          Logout <span className="logout-icon">→</span>
        </button>
      </div>

      <div className="user-profile-content">
        <div className="user-profile-sidebar">
          <button 
            className={`sidebar-button ${activeTab === 'history' ? 'active' : ''}`} 
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button 
            className={`sidebar-button ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`sidebar-button ${activeTab === 'address' ? 'active' : ''}`} 
            onClick={() => setActiveTab('address')}
          >
            Change Address
          </button>
          <button 
            className="sidebar-button delete-profile-button" 
            onClick={handleDeleteProfile}
          >
            Delete Profile
          </button>
        </div>

        <div className="user-profile-main">
          {activeTab === 'history' && <ProfileHistory orderHistory={orderHistory} />}
          {activeTab === 'profile' && <ProfileDetails user={user} />}
          {activeTab === 'address' && <ProfileAddress user={user} />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
