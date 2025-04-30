import React from 'react';
import './BuySet.css';

const BuySet = () => {
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

  const handleViewSet = (link) => {
    // Handle view set button click
    console.log('Viewing set:', link);
  };

  return (
    <div className="buy-set-page">
      <h1 className="page-title">Available Car Sets</h1>
      <div className="car-sets-grid">
        {carSets.map((set) => (
          <div key={set.id} className="car-set-card">
            <div className="car-set-image">
              <img src={set.image} alt={set.name} />
            </div>
            <h3 className="car-set-name">{set.name}</h3>
            <button 
              className="view-set-btn"
              onClick={() => handleViewSet(set.link)}
            >
              View Set <span className="arrow">▼</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuySet; 