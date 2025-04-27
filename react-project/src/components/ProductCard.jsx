import React from 'react';
import './ProductCard.css';

function ProductCard({ image, title, price }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <h3 className="product-title">{title}</h3>
      <div className="product-price">₱ {price.toFixed(2)}</div>
      <button className="add-to-cart">Add to cart</button>
    </div>
  );
}

export default ProductCard; 