import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

// Mock data for products (you should replace this with your actual product data)
const products = [
  {
    id: 1,
    title: 'Road Fit Pipe',
    price: 580.00,
    image: '/road-fit-pipe.jpg'
  },
  {
    id: 2,
    title: 'Vortex Exhaust Bent Pipe',
    price: 680.00,
    image: '/vortex-exhaust.jpg'
  },
  {
    id: 3,
    title: 'MagnaFlow Performance Exhaust Tailpipe 15395',
    price: 700.00,
    image: '/magnaflow-exhaust.jpg'
  },
  {
    id: 4,
    title: 'HKS Universal Car Exhaust Muffler Pipe',
    price: 800.00,
    image: '/hks-exhaust.jpg'
  },
  {
    id: 5,
    title: 'Newest Style 304 Stainless Steel',
    price: 900.00,
    image: '/stainless-steel.jpg'
  }
];

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Handle clicking outside of search bar to close results
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setShowResults(false);
      setFilteredProducts([]);
      return;
    }

    // Filter products based on search term
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);
    setShowResults(true);
  };

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Equipment"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      
      {showResults && filteredProducts.length > 0 && (
        <div className="search-results">
          {filteredProducts.map(product => (
            <div key={product.id} className="search-result-item">
              <img src={product.image} alt={product.title} className="result-image" />
              <div className="result-details">
                <h3>{product.title}</h3>
                <p className="result-price">₱ {product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 