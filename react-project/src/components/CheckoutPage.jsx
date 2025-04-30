import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!contactInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!contactInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!contactInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!contactInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Store contact info in sessionStorage
      sessionStorage.setItem('checkoutContactInfo', JSON.stringify(contactInfo));
      navigate('/shipping-payment');
    }
  };

  return (
    <div className="checkout-page">
      <Link to="/" className="back-button">
        <i className="fas fa-arrow-left"></i>
      </Link>
      
      <div className="checkout-container">
        <div className="contact-section">
          <div className="logo">
            <h1>MISAKI</h1>
            <span>Auto Supply</span>
          </div>

          <div className="contact-info">
            <h2>Contact Information:</h2>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleInputChange}
                placeholder=""
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleInputChange}
                placeholder=""
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={contactInfo.phone}
                onChange={handleInputChange}
                placeholder=""
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="shipping-address">
            <h2>Shipping Address:</h2>
            <div className="form-group">
              <input
                type="text"
                name="address"
                value={contactInfo.address}
                onChange={handleInputChange}
                placeholder=""
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary:</h2>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">₱ {item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>₱ {getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          <button 
            className="continue-to-payment"
            onClick={handleContinue}
          >
            Continue to Shipping & Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 