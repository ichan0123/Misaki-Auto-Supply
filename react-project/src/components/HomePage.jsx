import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HomePage.css';
import NewProducts from './NewProducts';
import Contact from './Contact';
import BuySet from './BuySet';
import InteractiveCarMap from './InteractiveCarMap';
import Footer from './Footer';

function HomePage() {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCarType, setActiveCarType] = useState(null);
  
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

  const carModels = {
    sedan: {
      title: "Sedan",
      image: "../src/assets/images/sedan.jpg",
      models: [
        { brand: "Toyota", model: "Toyota Corolla 7th Gen" },
        { brand: "Toyota", model: "Toyota Crown 12th Gen" },
        { brand: "Kia", model: "Kia Pride (2000)" },
        { brand: "Mitsubishi", model: "Mitsubishi Galant 8th Gen" },
        { brand: "Honda", model: "Honda Civic 7th Gen" },
        { brand: "Mitsubishi", model: "Mitsubishi Lancer 7th Gen" }
      ]
    },
    mpv: {
      title: "MPV",
      image: "../src/assets/images/mpv.jpg",
      models: [
        { brand: "Toyota", model: "Toyota Innova" },
        { brand: "Honda", model: "Honda Odyssey" },
        { brand: "Nissan", model: "Nissan Serena" },
        { brand: "Mazda", model: "Mazda 5" }
      ]
    },
    van: {
      title: "Van",
      image: "../src/assets/images/van.jpg",
      models: [
        { brand: "Toyota", model: "Toyota HiAce" },
        { brand: "Nissan", model: "Nissan NV350" },
        { brand: "Hyundai", model: "Hyundai Starex" },
        { brand: "Ford", model: "Ford Transit" }
      ]
    }
  };

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

  const handleCarTypeHover = (carType) => {
    setActiveCarType(carType);
  };

  const handleCarTypeLeave = () => {
    setActiveCarType(null);
  };

  return (
    <div className="home-page">
      <div className="menu-bar">
        <Link to="/new-products" className="menu-item">New Products</Link>
        <div className="dropdown" onMouseLeave={handleCarTypeLeave}>
          <button className="menu-item">Select Car Type ▼</button>
          <div className="dropdown-content car-type-dropdown">
            <div className="car-types">
              <div 
                className={`car-type-item ${activeCarType === 'sedan' ? 'active' : ''}`}
                onMouseEnter={() => handleCarTypeHover('sedan')}
              >
                <img src={carModels.sedan.image} alt="Sedan" className="car-type-image" />
                <span>Sedan ▶</span>
              </div>
              <div 
                className={`car-type-item ${activeCarType === 'mpv' ? 'active' : ''}`}
                onMouseEnter={() => handleCarTypeHover('mpv')}
              >
                <img src={carModels.mpv.image} alt="MPV" className="car-type-image" />
                <span>MPV ▶</span>
              </div>
              <div 
                className={`car-type-item ${activeCarType === 'van' ? 'active' : ''}`}
                onMouseEnter={() => handleCarTypeHover('van')}
              >
                <img src={carModels.van.image} alt="Van" className="car-type-image" />
                <span>Van ▶</span>
              </div>
            </div>
            
            {activeCarType && (
              <div className="car-models-dropdown">
                <h3>{carModels[activeCarType].title} Models</h3>
                <div className="car-models-list">
                  {carModels[activeCarType].models.map((model, index) => (
                    <Link to={`/car-parts/${model.brand.toLowerCase()}/${model.model.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="car-model-item">
                      {model.model}
                    </Link>
                  ))}
                </div>
              </div>
            )}
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

      <InteractiveCarMap carModel="Toyota Corolla 7th Gen" />
      
      <NewProducts />
      <BuySet />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;