import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CarModelProducts.css';

function CarModelProducts() {
  const { brand, model } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Model name formatting for display
  const formatModelName = (modelSlug) => {
    return modelSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Brand name formatting for display
  const formatBrandName = (brandName) => {
    return brandName.charAt(0).toUpperCase() + brandName.slice(1);
  };

  useEffect(() => {
    // In a real application, you would fetch products from an API
    // For now, we'll use mock data based on the brand and model
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const modelProducts = getProductsForModel(brand, model);
      setProducts(modelProducts);
      setLoading(false);
    }, 500);
  }, [brand, model]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Mock function to get products based on brand and model
  const getProductsForModel = (brand, model) => {
    // Common product categories for all car models
    const categories = ['Engine', 'Exhaust', 'Suspension', 'Brakes', 'Lighting', 'Interior', 'Exterior'];
    
    // Product data structure based on brand and model
    const productData = {
      'toyota': {
        'corolla-7th-gen': [
          {
            id: 101,
            title: "Corolla 7th Gen Performance Exhaust System",
            price: 580.00,
            image: "../src/assets/images/Dual-pipe.jpg",
            category: "Exhaust"
          },
          {
            id: 102,
            title: "Corolla 7th Gen Air Filter Kit",
            price: 120.00,
            image: "../src/assets/images/air-intake.jpg",
            category: "Engine"
          },
          {
            id: 103,
            title: "Corolla 7th Gen Lowering Springs",
            price: 350.00,
            image: "../src/assets/images/lowering-springs.jpg",
            category: "Suspension"
          },
          {
            id: 104,
            title: "Corolla 7th Gen LED Headlight Set",
            price: 450.00,
            image: "../src/assets/images/led-headlight.jpg",
            category: "Lighting"
          },
          {
            id: 105,
            title: "Corolla 7th Gen Brake Pad Set",
            price: 180.00,
            image: "../src/assets/images/brake-caliper.jpg",
            category: "Brakes"
          },
          {
            id: 106,
            title: "Corolla 7th Gen Carbon Fiber Hood",
            price: 1200.00,
            image: "../src/assets/images/carbon-hood.jpg",
            category: "Exterior"
          }
        ],
        'crown-12th-gen': [
          {
            id: 201,
            title: "Crown 12th Gen Premium Exhaust System",
            price: 780.00,
            image: "../src/assets/images/Magnaflow-pipe.jpg",
            category: "Exhaust"
          },
          {
            id: 202,
            title: "Crown 12th Gen Performance Air Intake",
            price: 220.00,
            image: "../src/assets/images/air-intake.jpg",
            category: "Engine"
          },
          {
            id: 203,
            title: "Crown 12th Gen Sport Suspension Kit",
            price: 950.00,
            image: "../src/assets/images/coilover.jpg",
            category: "Suspension"
          }
        ]
      },
      'honda': {
        'civic-7th-gen': [
          {
            id: 301,
            title: "Civic 7th Gen HKS Exhaust System",
            price: 650.00,
            image: "../src/assets/images/hks-exhaust.jpg",
            category: "Exhaust"
          },
          {
            id: 302,
            title: "Civic 7th Gen Cold Air Intake",
            price: 180.00,
            image: "../src/assets/images/air-intake.jpg",
            category: "Engine"
          },
          {
            id: 303,
            title: "Civic 7th Gen Coilover Kit",
            price: 850.00,
            image: "../src/assets/images/coilover.jpg",
            category: "Suspension"
          },
          {
            id: 304,
            title: "Civic 7th Gen LED Fog Light Kit",
            price: 220.00,
            image: "../src/assets/images/fog-lights.jpg",
            category: "Lighting"
          }
        ]
      },
      'nissan': {
        'altima': [
          {
            id: 401,
            title: "Altima Performance Exhaust System",
            price: 620.00,
            image: "../src/assets/images/Dual-pipe.jpg",
            category: "Exhaust"
          },
          {
            id: 402,
            title: "Altima Cold Air Intake System",
            price: 190.00,
            image: "../src/assets/images/air-intake.jpg",
            category: "Engine"
          }
        ]
      },
      'mazda': {
        'mazda-3': [
          {
            id: 501,
            title: "Mazda 3 Racing Exhaust System",
            price: 590.00,
            image: "../src/assets/images/Dual-pipe.jpg",
            category: "Exhaust"
          },
          {
            id: 502,
            title: "Mazda 3 Performance Air Filter",
            price: 150.00,
            image: "../src/assets/images/air-intake.jpg",
            category: "Engine"
          }
        ]
      }
    };

    // Generate default products if specific model products don't exist
    if (!productData[brand] || !productData[brand][model]) {
      return categories.map((category, index) => ({
        id: 1000 + index,
        title: `${formatBrandName(brand)} ${formatModelName(model)} ${category} Part`,
        price: 100.00 + (index * 50),
        image: "../src/assets/images/Dual-pipe.jpg",
        category: category
      }));
    }

    return productData[brand][model];
  };

  return (
    <div className="car-model-products">
      <div className="car-model-header">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt; 
          
          <span>{formatModelName(model)}</span>
        </div>
        <h1>{formatBrandName(brand)} {formatModelName(model)} Parts</h1>
        <p>Find high-quality performance and replacement parts for your {formatBrandName(brand)} {formatModelName(model)}.</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="no-products">
              <p>No products found for this model. Please check back later or contact us for assistance.</p>
            </div>
          ) : (
            <div className="product-categories">
             

              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-image">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "../src/assets/images/Dual-pipe.jpg";
                        }}
                        loading="lazy"
                      />
                      <span className="product-category">{product.category}</span>
                    </div>
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-price">₱ {product.price.toFixed(2)}</div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CarModelProducts;
