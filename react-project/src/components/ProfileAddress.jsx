import React, { useState } from 'react';
import './ProfileAddress.css';

function ProfileAddress({ user }) {
  // Default address data if not provided
  const defaultAddresses = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      address: 'Blk 1 Lot 2 Three St. Subdivision Brgy 456, Pampanga, Philippines',
      isDefault: true
    }
  ];

  const [addresses, setAddresses] = useState(user?.addresses || defaultAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    isDefault: false
  });
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingAddress(null);
    setNewAddress({
      name: '',
      address: '',
      isDefault: false
    });
  };

  const handleEditClick = (address) => {
    setShowAddForm(true);
    setEditingAddress(address.id);
    setNewAddress({
      name: address.name,
      address: address.address,
      isDefault: address.isDefault
    });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(address => address.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(address => {
        if (address.id === editingAddress) {
          return {
            ...address,
            name: newAddress.name,
            address: newAddress.address,
            isDefault: newAddress.isDefault
          };
        }
        // If the new address is set as default, make sure other addresses are not default
        return newAddress.isDefault ? { ...address, isDefault: false } : address;
      }));
    } else {
      // Add new address
      const newId = Math.max(0, ...addresses.map(a => a.id)) + 1;
      const addressToAdd = {
        id: newId,
        name: newAddress.name,
        address: newAddress.address,
        isDefault: newAddress.isDefault
      };
      
      if (newAddress.isDefault) {
        // If the new address is set as default, update other addresses
        setAddresses([
          ...addresses.map(address => ({ ...address, isDefault: false })),
          addressToAdd
        ]);
      } else {
        setAddresses([...addresses, addressToAdd]);
      }
    }
    
    // Reset form
    setShowAddForm(false);
    setEditingAddress(null);
    setNewAddress({
      name: '',
      address: '',
      isDefault: false
    });
  };

  return (
    <div className="profile-address">
      <h3>Saved Addresses</h3>
      
      <div className="address-list">
        {addresses.map(address => (
          <div key={address.id} className={`address-card ${address.isDefault ? 'default-address' : ''}`}>
            <div className="address-info">
              <div className="address-name">{address.name}</div>
              <div className="address-text">{address.address}</div>
              {address.isDefault && <div className="default-badge">Default</div>}
            </div>
            <div className="address-actions">
              <button className="edit-btn" onClick={() => handleEditClick(address)}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </button>
              <button className="delete-btn" onClick={() => handleDeleteClick(address.id)}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        <button className="add-address-card" onClick={handleAddClick}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span>Add new Address</span>
        </button>
      </div>
      
      {showAddForm && (
        <div className="address-form-container">
          <div className="address-form-overlay" onClick={() => setShowAddForm(false)}></div>
          <div className="address-form">
            <h4>{editingAddress ? 'Edit Address' : 'Add New Address'}</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Complete Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={newAddress.address}
                  onChange={handleInputChange}
                  required
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={handleInputChange}
                />
                <label htmlFor="isDefault">Set as default address</label>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileAddress;
