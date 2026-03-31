import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './BuySet.css';

const BuySet = ({ hideBackButton }) => {
  // If hideBackButton prop is not provided, determine if we're on the homepage
  const location = useLocation();
  const isHomePage = !hideBackButton ? location.pathname === '/' : hideBackButton;
  const [expandedSetId, setExpandedSetId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const carSets = [
    {
      id: 1,
      name: 'Toyota Corolla 7th Gen Set',
      image: '../src/assets/images/corolla-7th.jpg',
      link: '/sets/corolla-7th'
    },
    {
      id: 2,
      name: 'Toyota Innova 1st Gen',
      image: '../src/assets/images/innova-1st.jpg',
      link: '/sets/innova-1st'
    },
    {
      id: 3,
      name: 'Toyota HiAce 4th Gen',
      image: '../src/assets/images/hiace-4th.jpg',
      link: '/sets/hiace-4th'
    },
    {
      id: 4,
      name: 'Honda Civic FD Set',
      image: '../src/assets/images/civic-fd.jpg',
      link: '/sets/civic-fd'
    },
    {
      id: 5,
      name: 'Mitsubishi Adventure Set',
      image: '../src/assets/images/adventure.jpg',
      link: '/sets/adventure'
    },
    {
      id: 6,
      name: 'Nissan Urvan Estate Set',
      image: '../src/assets/images/urvan.jpg',
      link: '/sets/urvan'
    }
  ];

  // Sample products for each set
  const setProducts = {
    '/sets/corolla-7th': [
      { id: 101, name: 'Corolla 7th Gen Air Filter', price: 650, image: '../src/assets/images/corolla-air-filter.jpg' },
      { id: 102, name: 'Corolla 7th Gen Brake Pads (Front)', price: 1200, image: '../src/assets/images/corolla-brake-pads.jpg' },
      { id: 103, name: 'Corolla 7th Gen Oil Filter', price: 350, image: '../src/assets/images/corolla-oil-filter.jpg' },
      { id: 104, name: 'Corolla 7th Gen Spark Plugs (Set of 4)', price: 800, image: '../src/assets/images/corolla-spark-plugs.jpg' }
    ],
    '/sets/innova-1st': [
      { id: 201, name: 'Innova 1st Gen Air Filter', price: 750, image: '../src/assets/images/innova-air-filter.jpg' },
      { id: 202, name: 'Innova 1st Gen Brake Pads (Front)', price: 1400, image: '../src/assets/images/innova-brake-pads.jpg' },
      { id: 203, name: 'Innova 1st Gen Oil Filter', price: 400, image: '../src/assets/images/innova-oil-filter.jpg' },
      { id: 204, name: 'Innova 1st Gen Fuel Filter', price: 650, image: '../src/assets/images/innova-fuel-filter.jpg' }
    ],
    '/sets/hiace-4th': [
      { id: 301, name: 'HiAce 4th Gen Air Filter', price: 850, image: '../src/assets/images/hiace-air-filter.jpg' },
      { id: 302, name: 'HiAce 4th Gen Brake Pads (Front)', price: 1600, image: '../src/assets/images/hiace-brake-pads.jpg' },
      { id: 303, name: 'HiAce 4th Gen Oil Filter', price: 450, image: '../src/assets/images/hiace-oil-filter.jpg' },
      { id: 304, name: 'HiAce 4th Gen Fuel Filter', price: 750, image: '../src/assets/images/hiace-fuel-filter.jpg' }
    ],
    '/sets/civic-fd': [
      { id: 401, name: 'Civic FD Air Filter', price: 700, image: '../src/assets/images/civic-air-filter.jpg' },
      { id: 402, name: 'Civic FD Brake Pads (Front)', price: 1350, image: '../src/assets/images/civic-brake-pads.jpg' },
      { id: 403, name: 'Civic FD Oil Filter', price: 380, image: '../src/assets/images/civic-oil-filter.jpg' },
      { id: 404, name: 'Civic FD Spark Plugs (Set of 4)', price: 950, image: '../src/assets/images/civic-spark-plugs.jpg' }
    ],
    '/sets/adventure': [
      { id: 501, name: 'Adventure Air Filter', price: 680, image: '../src/assets/images/adventure-air-filter.jpg' },
      { id: 502, name: 'Adventure Brake Pads (Front)', price: 1250, image: '../src/assets/images/adventure-brake-pads.jpg' },
      { id: 503, name: 'Adventure Oil Filter', price: 370, image: '../src/assets/images/adventure-oil-filter.jpg' },
      { id: 504, name: 'Adventure Fuel Filter', price: 620, image: '../src/assets/images/adventure-fuel-filter.jpg' }
    ],
    '/sets/urvan': [
      { id: 601, name: 'Urvan Estate Air Filter', price: 780, image: '../src/assets/images/urvan-air-filter.jpg' },
      { id: 602, name: 'Urvan Estate Brake Pads (Front)', price: 1450, image: '../src/assets/images/urvan-brake-pads.jpg' },
      { id: 603, name: 'Urvan Estate Oil Filter', price: 420, image: '../src/assets/images/urvan-oil-filter.jpg' },
      { id: 604, name: 'Urvan Estate Fuel Filter', price: 680, image: '../src/assets/images/urvan-fuel-filter.jpg' }
    ]
  };

  const handleViewSet = (id, link) => {
    if (expandedSetId === id) {
      setExpandedSetId(null); // Collapse if already expanded
    } else {
      setExpandedSetId(id); // Expand the clicked set
    }
  };

  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      // Keep the modal open so user can see the product was added
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="buy-set-page">
      <div className="page-header-with-back">
        {!isHomePage && (
          <button className="back-btn" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        )}
        <h1 className="page-title">Available Car Sets</h1>
      </div>
      <div className="car-sets-grid">
        {carSets.map((set) => (
          <div key={set.id} className="car-set-card">
            <div className="car-set-image">
              <img src={set.image} alt={set.name} />
            </div>
            <h3 className="car-set-name">{set.name}</h3>
            <button 
              className={`view-set-btn ${expandedSetId === set.id ? 'active' : ''}`}
              onClick={() => handleViewSet(set.id, set.link)}
              aria-expanded={expandedSetId === set.id}
            >
              View Set <span className="arrow">{expandedSetId === set.id ? '▲' : '▼'}</span>
            </button>
            {expandedSetId === set.id && (
              <div className="set-products">
                <h4>Products in this set:</h4>
                <div className="product-grid">
                  {setProducts[set.link].map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '../src/assets/images/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="product-details">
                        <h5>{product.name}</h5>
                        <p className="product-price">₱{product.price.toLocaleString()}</p>
                        <button 
                          className="view-product-btn"
                          onClick={() => handleViewProduct(product)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && selectedProduct && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>×</button>
            <div className="product-modal-content">
              <div className="product-modal-image">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '../src/assets/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="product-modal-details">
                <h3>{selectedProduct.name}</h3>
                <p className="product-modal-price">₱{selectedProduct.price.toLocaleString()}</p>
                <div className="product-modal-description">
                  <p>High-quality {selectedProduct.name.toLowerCase()} designed specifically for optimal performance and durability.</p>
                  <ul>
                    <li>OEM quality replacement part</li>
                    <li>Manufactured to strict quality standards</li>
                    <li>Direct fit for easy installation</li>
                    <li>12-month warranty included</li>
                  </ul>
                </div>
                <div className="product-modal-actions">
                  <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button className="view-full-details-btn" onClick={() => navigateToProduct(selectedProduct.id)}>
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuySet;
                       