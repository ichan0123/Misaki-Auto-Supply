import React from "react";
import { Link } from "react-router-dom";
import "./NewProducts.css";
import { useCart } from "../context/CartContext";

function NewProducts() {
  const { addToCart } = useCart();
  const products = [
    {
      id: 1,
      title: "Custom Dual Exhaust Pipe",
      price: 580.0,
      image: "../src/assets/images/Dual-pipe.jpg",
      category: "Exhaust",
    },
    {
      id: 2,
      title: "Vortex Exhaust Bent Pipe",
      price: 680.0,
      image: "../src/assets/images/Vortex Exhaust Bent Pipe.jpg",
      category: "Exhaust",
    },
    {
      id: 3,
      title: "MagnaFlow Performance Exhaust Tailpipe 15395",
      price: 700.0,
      image: "../src/assets/images/Magnaflow-pipe.jpg",
      category: "Exhaust",
    },
    {
      id: 4,
      title: "HKS Hi-Power Exhaust System",
      price: 950.0,
      image: "../src/assets/images/hks-exhaust.jpg",
      category: "Exhaust",
    },
    {
      id: 5,
      title: "LED Headlight Conversion Kit",
      price: 450.0,
      image: "../src/assets/images/led-headlight.jpg",
      category: "Lighting",
    },
    {
      id: 6,
      title: "Sequential LED Turn Signals",
      price: 280.0,
      image: "../src/assets/images/led-signals.jpg",
      category: "Lighting",
    },
    {
      id: 7,
      title: "Coilover Suspension Kit",
      price: 1200.0,
      image: "../src/assets/images/coilover.jpg",
      category: "Suspension",
    },
    {
      id: 8,
      title: "Performance Lowering Springs",
      price: 450.0,
      image: "../src/assets/images/lowering-springs.jpg",
      category: "Suspension",
    },
    {
      id: 9,
      title: "Carbon Fiber Hood",
      price: 1500.0,
      image: "../src/assets/images/carbon-hood.jpg",
      category: "Exterior",
    },
    {
      id: 10,
      title: "Sport Racing Seats",
      price: 890.0,
      image: "../src/assets/images/racing-seats.jpg",
      category: "Interior",
    },
    {
      id: 11,
      title: "Performance Air Intake System",
      price: 350.0,
      image: "../src/assets/images/air-intake.jpg",
      category: "Engine",
    },
    {
      id: 12,
      title: "Brake Caliper Kit",
      price: 780.0,
      image: "../src/assets/images/brake-caliper.jpg",
      category: "Brakes",
    },
    {
      id: 13,
      title: "LED Fog Lights Kit",
      price: 320.0,
      image: "../src/assets/images/fog-lights.jpg",
      category: "Lighting",
    },
    {
      id: 14,
      title: "Performance Radiator",
      price: 560.0,
      image: "../src/assets/images/radiator.jpg",
      category: "Engine",
    },
    {
      id: 15,
      title: "Stainless Steel Headers",
      price: 890.0,
      image: "../src/assets/images/headers.jpg",
      category: "Exhaust",
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
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <span className="product-category">{product.category}</span>
              </div>
              <h3 className="product-title">{product.title}</h3>
              <div className="product-price">₱ {product.price.toFixed(2)}</div>
            </Link>
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
