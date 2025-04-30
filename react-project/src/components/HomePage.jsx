import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HomePage.css';
import NewProducts from './NewProducts';
import Contact from './Contact';
import BuySet from './BuySet';

function HomePage() {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "NEW CAR PARTS IN STOCK",
      subtitle: "FOR TOYOTA COROLLA",
      image: "../src/assets/images/toyota-corolla.jpg"
    },
    {
      title: "PREMIUM AUTO PARTS",
      subtitle: "FOR HONDA CIVIC",
      image: "../src/assets/images/honda-civic.jpg"
    },
    {
      title: "QUALITY COMPONENTS",
      subtitle: "FOR NISSAN ALTIMA",
      image: "../src/assets/images/nissan_altima.avif"
    },
    {
      title: "GENUINE PARTS",
      subtitle: "FOR MAZDA 3",
      image: "../src/assets/images/mazda.avif"
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
        <Link to="/new-products" className="menu-item">New Products</Link>
        <div className="dropdown">
          <button className="menu-item">Select Car Type ▼</button>
          <div className="dropdown-content">
            <a href="#">Toyota</a>
            <a href="#">Honda</a>
            <a href="#">Nissan</a>
            <a href="#">Mazda</a>
          </div>
        </div>
        <Link to="/buy-set" className="menu-item">Buy a set</Link>
        <Link to="/contact" className="menu-item">Contact</Link>
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

      <NewProducts />
      <BuySet />
      <Contact />
    </div>
  );
}

export default HomePage; 