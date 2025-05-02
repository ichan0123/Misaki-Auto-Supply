import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InteractiveCarMap.css';
// Import car image
import undercarImage from '../assets/images/undercar.jpeg';



const InteractiveCarMap = ({ carModel = "Toyota Corolla 7th Gen" }) => {
  const navigate = useNavigate();
  const [activeHotspot, setActiveHotspot] = useState(null);
  
  // Define car parts for the interactive map
  const carParts = [
    {
      id: 1,
      name: 'Exhaust System',
      category: 'Exhaust',
      description: 'Performance exhaust systems for enhanced sound and power',
      position: { top: '15%', left: '75%' }
    },
    {
      id: 2,
      name: 'Engine Components',
      category: 'Engine',
      description: 'High-performance engine parts and accessories',
      position: { top: '25%', left: '50%' }
    },
    {
      id: 3,
      name: 'Suspension System',
      category: 'Suspension',
      description: 'Suspension kits for improved handling and ride quality',
      position: { top: '60%', left: '30%' }
    },
    {
      id: 4,
      name: 'Brake System',
      category: 'Brakes',
      description: 'Performance brake kits for better stopping power',
      position: { top: '60%', left: '70%' }
    },
    {
      id: 5,
      name: 'Exterior Parts',
      category: 'Exterior',
      description: 'Body kits and exterior accessories for a custom look',
      position: { top: '15%', left: '25%' }
    }
  ];

  // Handle hotspot click
  const handlePartClick = (part) => {
    navigate(`/category/${part.category.toLowerCase()}`);
  };

  // We're now using a fixed undercar image regardless of model
  const getCarImage = () => {
    return undercarImage;
  };

  return (
    <div className="interactive-car-map">
      <h2>{carModel} Parts Interactive Map</h2>
      <p>Click on the highlighted parts to explore available components</p>
      
      <div className="car-map-container">
        <img src={getCarImage()} alt={`${carModel} view`} className="car-image" />
        
        {/* Render part hotspots */}
        {carParts.map((part) => (
          <div 
            key={part.id}
            className={`hotspot ${activeHotspot === part.id ? 'active' : ''}`}
            style={{ 
              top: part.position.top, 
              left: part.position.left 
            }}
            onClick={() => handlePartClick(part)}
            onMouseEnter={() => setActiveHotspot(part.id)}
            onMouseLeave={() => setActiveHotspot(null)}
          >
            <div className="hotspot-dot"></div>
            
            {activeHotspot === part.id && (
              <div className="hotspot-tooltip">
                <h3>{part.name}</h3>
                <p>{part.description}</p>
                <span className="view-parts">View Parts →</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveCarMap;
