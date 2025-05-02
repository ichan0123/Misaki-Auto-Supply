import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';
import './Navbar.css';

// Mock data for products
const products = [
  {
    id: 1,
    title: 'Road Fit Pipe',
    price: 580.00,
    image: '/road-fit-pipe.jpg',
    category: 'Exhaust',
    brand: 'Toyota',
    model: 'Corolla 7th Gen'
  },
  {
    id: 2,
    title: 'Vortex Exhaust Bent Pipe',
    price: 680.00,
    image: '/vortex-exhaust.jpg',
    category: 'Exhaust',
    brand: 'Honda',
    model: 'Civic 7th Gen'
  },
  {
    id: 3,
    title: 'MagnaFlow Performance Exhaust Tailpipe 15395',
    price: 700.00,
    image: '/magnaflow-exhaust.jpg',
    category: 'Exhaust',
    brand: 'Nissan',
    model: 'Altima'
  },
  {
    id: 4,
    title: 'HKS Universal Car Exhaust Muffler Pipe',
    price: 800.00,
    image: '/hks-exhaust.jpg',
    category: 'Exhaust',
    brand: 'Mazda',
    model: 'Mazda 3'
  },
  {
    id: 5,
    title: 'Newest Style 304 Stainless Steel',
    price: 900.00,
    image: '/stainless-steel.jpg',
    category: 'Exhaust',
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

function Navbar({ onLoginClick, isAuthenticated, onLogout, user }) {
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
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
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <h1>MISAKI</h1>
          <span>Auto Supply</span>
        </Link>
        
        <div className="search-bar" ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search Vehicle Parts"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
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

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/profile" className="user-email">{user.email}</Link>
              <button className="logout-btn" onClick={onLogout}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                LOGOUT
              </button>
            </div>
          ) : (
            <button className="login-signup-btn" onClick={onLoginClick}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              LOGIN / SIGN UP
            </button>
          )}
          <button className="cart-btn" onClick={toggleCart}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="cart-count">{getCartCount()}</span>
          </button>
        </div>
      </nav>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;