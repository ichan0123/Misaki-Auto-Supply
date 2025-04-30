import React from "react";
import "./NewProducts.css";
import { useCart } from "../context/CartContext";

function NewProducts() {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      title: "Custom Dual Exhaust pipe",
      price: 580.0,
      image: "../src/assets/images/Dual-pipe.jpg",
    },
    {
      id: 2,
      title: "Vortex Exhaust Bent Pipe",
      price: 680.0,
      image: "../src/assets/images/Vortex Exhaust Bent Pipe.jpg",
    },
    {
      id: 3,
      title: "MagnaFlow Performance Exhaust Tailpipe 15395",
      price: 700.0,
      image: "../src/assets/images/Magnaflow-pipe.jpg",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="new-products">
      <h2>New Products</h2>
      <div className="products-grid">
        {products.map((product) => (
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
