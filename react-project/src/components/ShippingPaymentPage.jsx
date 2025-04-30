import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ShippingPaymentPage.css';

function ShippingPaymentPage() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedShipping, setSelectedShipping] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Retrieve contact info from sessionStorage
    const savedContactInfo = sessionStorage.getItem('checkoutContactInfo');
    if (!savedContactInfo) {
      // If no contact info, redirect back to checkout
      navigate('/checkout');
      return;
    }
    setCustomerInfo(JSON.parse(savedContactInfo));
  }, [navigate]);

  const handleConfirm = () => {
    // Here you would typically handle the order submission
    // For now, we'll just show an alert
    alert('Order confirmed! This is where you would handle the order submission.');
  };

  if (!customerInfo) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="shipping-payment-page">
      <Link to="/checkout" className="back-button">
        <i className="fas fa-arrow-left"></i>
      </Link>
      
      <div className="shipping-payment-container">
        <div className="info-section">
          <div className="logo">
            <h1>MISAKI</h1>
            <span>Auto Supply</span>
          </div>

          <div className="customer-info">
            <p>{customerInfo.name}</p>
            <p>{customerInfo.email}</p>
            <p>{customerInfo.phone}</p>
            <p>{customerInfo.address}</p>
          </div>

          <div className="shipping-options">
            <h2>SHIPPING:</h2>
            <div className="shipping-methods">
              <button 
                className={`shipping-method ${selectedShipping === 'misaki' ? 'selected' : ''}`}
                onClick={() => setSelectedShipping('misaki')}
              >
                MISAKI
              </button>
              <button 
                className={`shipping-method ${selectedShipping === 'lalamove' ? 'selected' : ''}`}
                onClick={() => setSelectedShipping('lalamove')}
              >
                LALAMOVE
              </button>
            </div>
            {selectedShipping === 'misaki' && (
              <small>Address within Pampanga can be covered by us with no shipping fee</small>
            )}
          </div>

          <Link to="/" className="homepage-link">
            Go back to Homepage
          </Link>
        </div>

        <div className="order-summary">
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
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

          <div className="payment-options">
            <h2>Payment Method:</h2>
            <div className="payment-methods">
              <button 
                className={`payment-method ${selectedPayment === 'cod' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('cod')}
              >
                Cash on Delivery
              </button>
              <button 
                className={`payment-method ${selectedPayment === 'gcash' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('gcash')}
              >
                GCash
              </button>
            </div>
          </div>

          <button 
            className="confirm-button"
            disabled={!selectedPayment || !selectedShipping}
            onClick={handleConfirm}
          >
            Confirm All
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingPaymentPage; 