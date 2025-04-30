import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPopup.css';

function CartPopup() {
  const { showCartPopup } = useCart();

  if (!showCartPopup) return null;

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        <div className="cart-popup-icon">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className="cart-popup-message">
          <h3>Your item is in the cart</h3>
          <Link to="/cart" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPopup; 