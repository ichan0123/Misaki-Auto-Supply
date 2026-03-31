import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./NewProducts.css";
import { useCart } from "../context/CartContext";

const mockProducts = [
  { id: 1, name: 'Road Fit Pipe', price: 580.00, image: '/road-fit-pipe.jpg', category: 'Exhaust' },
  { id: 2, name: 'Vortex Exhaust Bent Pipe', price: 680.00, image: '/vortex-exhaust.jpg', category: 'Exhaust' },
  { id: 3, name: 'MagnaFlow Performance Exhaust Tailpipe 15395', price: 700.00, image: '/magnaflow-exhaust.jpg', category: 'Exhaust' },
  { id: 4, name: 'HKS Universal Car Exhaust Muffler Pipe', price: 800.00, image: '/hks-exhaust.jpg', category: 'Exhaust' },
  { id: 5, name: 'Newest Style 304 Stainless Steel', price: 900.00, image: '/stainless-steel.jpg', category: 'Exhaust' },
  { id: 6, name: 'Toyota Corolla Air Filter Kit', price: 120.00, image: '/air-filter.jpg', category: 'Engine' },
  { id: 7, name: 'Toyota Crown Performance Air Intake', price: 220.00, image: '/air-intake.jpg', category: 'Engine' },
  { id: 8, name: 'Honda Civic Cold Air Intake', price: 180.00, image: '/cold-air-intake.jpg', category: 'Engine' },
];

function NewProducts({ hideBackButton }) {
  // If hideBackButton prop is not provided, determine if we're on the homepage
  const location = useLocation();
  const isHomePage = !hideBackButton ? location.pathname === '/' : hideBackButton;
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const loadProducts = () => {
    setProducts(mockProducts);
    setLoading(false);
  };
  
  const goBack = () => {
    navigate(-1);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="new-products">
      <div className="page-header-with-back">
        {!isHomePage && (
          <button className="back-btn" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        )}
        <h2>New Products</h2>
      </div>

      {loading ? (
        <div className="loading-container" style={{padding: '60px', textAlign: 'center'}}>
          <div className="loading-spinner">Loading products...</div>
        </div>
      ) : error ? (
        <div className="error-container" style={{padding: '60px', textAlign: 'center'}}>
          <div className="error-message">⚠️ {error}</div>
          <button onClick={loadProducts} className="retry-button" style={{marginTop: '20px'}}>
            Retry
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products" style={{padding: '60px', textAlign: 'center'}}>
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <img src={product.image || '/images/placeholder.jpg'} alt={product.name} />
                  <span className="product-category">{product.category || 'General'}</span>
                </div>
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">₱ {parseFloat(product.price).toFixed(2)}</div>
              </Link>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart({
                  id: product.id,
                  title: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category
                })}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewProducts;
