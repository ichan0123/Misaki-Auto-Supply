import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InteractiveCarMap.css';
// Import car image
import undercarImage from '../assets/images/undercar.jpeg';


const InteractiveCarMap = ({ carModel = "Toyota Corolla 7th Gen" }) => {
  const navigate = useNavigate();
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [showAllHotspots, setShowAllHotspots] = useState(false);
  const [zoomedPart, setZoomedPart] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  
  // Define car parts for the interactive map
  const carParts = [
    {
      id: 1,
      name: 'Exhaust System',
      category: 'Exhaust',
      description: 'Performance exhaust systems for enhanced sound and power',
      position: { top: '15%', left: '75%' },
      productId: 101 // Linking to a specific product ID
    },
    {
      id: 2,
      name: 'Engine Components',
      category: 'Engine',
      description: 'High-performance engine parts and accessories',
      position: { top: '25%', left: '50%' },
      productId: 102 // Linking to a specific product ID
    },
    {
      id: 3,
      name: 'Suspension System',
      category: 'Suspension',
      description: 'Suspension kits for improved handling and ride quality',
      position: { top: '60%', left: '30%' },
      productId: 103 // Linking to a specific product ID
    },
    {
      id: 4,
      name: 'Brake System',
      category: 'Brakes',
      description: 'Performance brake kits for better stopping power',
      position: { top: '60%', left: '70%' },
      productId: 105 // Linking to a specific product ID
    },
    {
      id: 5,
      name: 'Exterior Parts',
      category: 'Exterior',
      description: 'Body kits and exterior accessories for a custom look',
      position: { top: '15%', left: '25%' },
      productId: 106 // Linking to a specific product ID
    }
  ];

  // Handle hotspot click
  const handlePartClick = (part) => {
    // Toggle zoom view for the part
    if (zoomedPart && zoomedPart.id === part.id) {
      setZoomedPart(null);
      setIsZoomed(false);
    } else {
      setZoomedPart(part);
      setIsZoomed(true);
    }
  };
  
  // Navigate to product page
  const navigateToProduct = (part) => {
    // If a specific product ID is available, navigate to the product detail page
    if (part.productId) {
      navigate(`/product/${part.productId}`);
    } else {
      // Otherwise, navigate to the category page
      navigate(`/category/${part.category.toLowerCase()}`);
    }
  };
  
  // Toggle showing all hotspots
  const toggleAllHotspots = () => {
    setShowAllHotspots(!showAllHotspots);
  };
  
  // Toggle between map view and grid view
  const toggleView = () => {
    setGridView(!gridView);
    if (isZoomed) {
      setZoomedPart(null);
      setIsZoomed(false);
    }
  };

  // We're now using a fixed undercar image regardless of model
  const getCarImage = () => {
    return undercarImage;
  };
  
  // Close zoom view when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isZoomed && !event.target.closest('.zoom-view') && !event.target.closest('.hotspot')) {
        setZoomedPart(null);
        setIsZoomed(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isZoomed]);

  return (
    <div className="interactive-car-map">
      <div className="map-header">
        <h2>{carModel} Parts Interactive Map</h2>
        <div className="map-controls">
          <button className="toggle-view-btn" onClick={toggleView}>
            {gridView ? 'Show Map View' : 'Show Grid View'}
          </button>
          {!gridView && (
            <button className="toggle-hotspots-btn" onClick={toggleAllHotspots}>
              {showAllHotspots ? 'Hide All Parts' : 'Show All Parts'}
            </button>
          )}
        </div>
      </div>
      <p>{gridView ? 'Browse all available parts for your vehicle' : 'Click on the highlighted parts to explore available components'}</p>
      
      {!gridView ? (
        <div className={`car-map-container ${isZoomed ? 'zoomed' : ''}`}>
          <img src={getCarImage()} alt={`${carModel} view`} className="car-image" />
          
          {/* Render part hotspots */}
          {carParts.map((part) => (
            <div 
              key={part.id}
              className={`hotspot ${activeHotspot === part.id ? 'active' : ''} ${showAllHotspots ? 'always-visible' : ''} ${zoomedPart && zoomedPart.id === part.id ? 'selected' : ''}`}
              style={{ 
                top: part.position.top, 
                left: part.position.left 
              }}
              onClick={() => handlePartClick(part)}
              onMouseEnter={() => setActiveHotspot(part.id)}
              onMouseLeave={() => !showAllHotspots ? setActiveHotspot(null) : null}
            >
              <div className="hotspot-dot"></div>
              <div className="hotspot-label">{part.name}</div>
              
              {(activeHotspot === part.id || showAllHotspots) && (
                <div className="hotspot-tooltip">
                  <h3>{part.name}</h3>
                  <p>{part.description}</p>
                  <span className="view-parts" onClick={(e) => {
                    e.stopPropagation();
                    navigateToProduct(part);
                  }}>View Product Details</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Zoom view */}
          {isZoomed && zoomedPart && (
            <div className="zoom-view">
              <div className="zoom-content">
                <div className="zoom-image-container">
                  <img src={getCarImage()} alt={zoomedPart.name} className="zoom-image" />
                  <div className="zoom-hotspot" style={{ top: zoomedPart.position.top, left: zoomedPart.position.left }}>
                    <div className="zoom-hotspot-dot"></div>
                  </div>
                </div>
                <div className="zoom-details">
                  <h2>{zoomedPart.name}</h2>
                  <p className="zoom-description">{zoomedPart.description}</p>
                  <div className="zoom-price-tag">
                    <div className="price-tag-header">
                      <span className="part-brand">{zoomedPart.category}</span>
                      <span className="part-name">{zoomedPart.name}</span>
                    </div>
                    <div className="price-tag-price">
                      <span className="currency">$</span>
                      <span className="amount">{(zoomedPart.id * 100) + 990}</span>
                    </div>
                    <div className="price-tag-footer">
                      <span className="stock">In stock: 22 pieces</span>
                    </div>
                  </div>
                  <div className="zoom-actions">
                    <button className="zoom-close-btn" onClick={() => {
                      setZoomedPart(null);
                      setIsZoomed(false);
                    }}>Close</button>
                    <button className="zoom-view-product-btn" onClick={() => navigateToProduct(zoomedPart)}>
                      View Product Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="parts-grid-container">
          {carParts.map((part) => (
            <div 
              key={part.id} 
              className="product-card"
              onMouseEnter={() => setHoveredProduct(part.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => navigateToProduct(part)}
            >
              <div className="product-image-container">
                <img src={getCarImage()} alt={part.name} className="product-thumbnail" />
                <div className="product-hotspot" style={{ top: part.position.top, left: part.position.left }}>
                  <div className="product-hotspot-dot"></div>
                </div>
                {hoveredProduct === part.id && (
                  <div className="quick-view-overlay">
                    <button className="quick-view-btn" onClick={(e) => {
                      e.stopPropagation();
                      setZoomedPart(part);
                      setIsZoomed(true);
                      setGridView(false);
                    }}>Quick View</button>
                  </div>
                )}
              </div>
              <div className="product-info">
                <div className="product-header">
                  <span className="product-category">{part.category}</span>
                  <h3 className="product-name">{part.name}</h3>
                </div>
                <div className="product-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{(part.id * 100) + 990}</span>
                </div>
                <p className="product-description">{part.description.substring(0, 60)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractiveCarMap;
