import React from 'react';
import './NewProducts.css';
import { useCart } from '../context/CartContext';

function NewProducts() {
  const { addToCart } = useCart();
  
  const products = [
    {
      id: 1,
      title: "Road Fit Pipe",
      price: 580.00,
      image: "/images/products/road-fit-pipe.jpg"
    },
    {
      id: 2,
      title: "Vortex Exhaust Bent Pipe",
      price: 680.00,
      image: "/images/products/vortex-exhaust.jpg"
    },
    {
      id: 3,
      title: "MagnaFlow Performance Exhaust Tailpipe 15395",
      price: 700.00,
      image: "/images/products/magnaflow-exhaust.jpg"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="new-products">
      <h2>New Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <div className="product-price">₱ {product.price.toFixed(2)}</div>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewProducts; 