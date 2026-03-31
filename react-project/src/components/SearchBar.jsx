import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

// Mock data for products (you should replace this with your actual product data)
const products = [
  {
    id: 1,
    title: 'Road Fit Pipe',
    price: 580.00,
    image: '/road-fit-pipe.jpg',
    category: 'Exhaust Systems',
    brand: 'Toyota',
    model: 'Corolla 7th Gen'
  },
  {
    id: 2,
    title: 'Vortex Exhaust Bent Pipe',
    price: 680.00,
    image: '/vortex-exhaust.jpg',
    category: 'Exhaust Systems',
    brand: 'Honda',
    model: 'Civic 7th Gen'
  },
  {
    id: 3,
    title: 'MagnaFlow Performance Exhaust Tailpipe 15395',
    price: 700.00,
    image: '/magnaflow-exhaust.jpg',
    category: 'Exhaust Systems',
    brand: 'Nissan',
    model: 'Altima'
  },
  {
    id: 4,
    title: 'HKS Universal Car Exhaust Muffler Pipe',
    price: 800.00,
    image: '/hks-exhaust.jpg',
    category: 'Exhaust Systems',
    brand: 'Mazda',
    model: 'Mazda 3'
  },
  {
    id: 5,
    title: 'Newest Style 304 Stainless Steel',
    price: 900.00,
    image: '/stainless-steel.jpg',
    category: 'Exhaust Systems',
    brand: 'Toyota',
    model: 'Crown 12th Gen'
  },
  {
    id: 6,
    title: 'Toyota Corolla Air Filter Kit',
    price: 120.00,
    image: '/air-filter.jpg',
    category: 'Engine',
    brand: 'Toyota',
    model: 'Corolla 7th Gen'
  },
  {
    id: 7,
    title: 'Toyota Crown Performance Air Intake',
    price: 220.00,
    image: '/air-intake.jpg',
    category: 'Engine',
    brand: 'Toyota',
    model: 'Crown 12th Gen'
  },
  {
    id: 8,
    title: 'Honda Civic Cold Air Intake',
    price: 180.00,
    image: '/cold-air-intake.jpg',
    category: 'Engine',
    brand: 'Honda',
    model: 'Civic 7th Gen'
  }
];

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

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

    // Enhanced search logic to handle complex queries
    const searchTerms = value.toLowerCase().split(' ');
    
    const filtered = products.filter(product => {
      // Check if product matches all search terms
      return searchTerms.every(term => {
        return (
          product.title.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.model.toLowerCase().includes(term)
        );
      });
    });

    setFilteredProducts(filtered);
    setShowResults(true);
  };

  const handleProductClick = (product) => {
    // Get the exact search terms the user entered
    const searchTermLower = searchTerm.toLowerCase();
    
    // Extract key terms from the search
    const containsBrand = searchTermLower.includes(product.brand.toLowerCase());
    const containsModel = searchTermLower.includes(product.model.toLowerCase().split(' ')[0]);
    const containsCategory = searchTermLower.includes(product.category.toLowerCase());
    const containsProductTitle = searchTermLower.includes(product.title.toLowerCase().substring(0, 5));
    
    // Determine the best navigation path based on what the user searched for
    
    // If they searched for the specific product title, go to that product
    if (containsProductTitle) {
      navigate(`/product/${product.id}`);
    }
    // If they searched for brand + model, go to that car's parts page
    else if (containsBrand && containsModel) {
      const brandSlug = product.brand.toLowerCase();
      const modelSlug = product.model.replace(/\s+/g, '-').toLowerCase();
      navigate(`/car-parts/${brandSlug}/${modelSlug}`);
    }
    // If they searched for brand + category, go to filtered category page
    else if (containsBrand && containsCategory) {
      navigate(`/category/${product.category.toLowerCase()}?brand=${product.brand.toLowerCase()}`);
    }
    // If they searched for just a category, go to category page
    else if (containsCategory) {
      navigate(`/category/${product.category.toLowerCase()}`);
    }
    // If they searched for just a brand, go to brand page
    else if (containsBrand) {
      navigate(`/brand/${product.brand.toLowerCase()}`);
    }
    // Default fallback - go to the product's category
    else {
      navigate(`/category/${product.category.toLowerCase()}`);
    }
    
    // Clear search results after navigation
    setShowResults(false);
    setSearchTerm('');
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
            <div 
              key={product.id} 
              className="search-result-item" 
              onClick={() => handleProductClick(product)}
            >
              <img src={product.image} alt={product.title} className="result-image" />
              <div className="result-details">
                <h3>{product.title}</h3>
                <p className="result-brand">{product.brand} {product.model}</p>
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