import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ id, image, title, price, category }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart({ id, image, title, price, category });
  };
  
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">
        <div className="product-image">
          <img src={image} alt={title} />
          {category && <span className="product-category">{category}</span>}
        </div>
        <h3 className="product-title">{title}</h3>
        <div className="product-price">₱ {price.toFixed(2)}</div>
      </Link>
      <button className="add-to-cart" onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

export default ProductCard; 