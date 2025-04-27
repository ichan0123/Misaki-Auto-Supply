import React, { useState, useEffect } from 'react';
import './HomePage.css';
import ProductCard from './ProductCard';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "NEW CAR PARTS IN STOCK",
      subtitle: "FOR TOYOTA COROLLA",
      image: "../images/toyota_corolla.jpg"
    },
    {
      title: "PREMIUM AUTO PARTS",
      subtitle: "FOR HONDA CIVIC",
      image: "/images/honda-civic.jpg"
    },
    {
      title: "QUALITY COMPONENTS",
      subtitle: "FOR NISSAN ALTIMA",
      image: "/images/nissan-altima.jpg"
    },
    {
      title: "GENUINE PARTS",
      subtitle: "FOR MAZDA 3",
      image: "/images/mazda3.jpg"
    }
  ];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">
      <div className="menu-bar">
        <button className="menu-item active">New Products</button>
        <div className="dropdown">
          <button className="menu-item">Select Car Type ▼</button>
          <div className="dropdown-content">
            <a href="#">Toyota</a>
            <a href="#">Honda</a>
            <a href="#">Nissan</a>
            <a href="#">Mazda</a>
          </div>
        </div>
        <button className="menu-item">Buy a set</button>
        <button className="menu-item">Contact</button>
      </div>

      <div 
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slides[currentSlide].image})`
        }}
      >
        <div className="hero-content">
          <h1>{slides[currentSlide].title}</h1>
          <h2>{slides[currentSlide].subtitle}</h2>
        </div>
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </div>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage; 