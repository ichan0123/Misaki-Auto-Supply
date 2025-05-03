import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CarModelProducts.css';

function CarModelProducts() {
  const { brand, model, categoryName, brandName, productId } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCategory, setIsCategory] = useState(false);
  const [isBrand, setIsBrand] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [filterBrand, setFilterBrand] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);

  // Model name formatting for display
  const formatModelName = (modelSlug) => {
    return modelSlug
      ? modelSlug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : '';
  };

  // Brand name formatting for display
  const formatBrandName = (brandName) => {
    return brandName ? brandName.charAt(0).toUpperCase() + brandName.slice(1) : '';
  };

  // Format category name for display
  const formatCategoryName = (category) => {
    return category
      ? category
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : '';
  };

  useEffect(() => {
    // In a real application, you would fetch products from an API
    // For now, we'll use mock data based on the parameters
    setLoading(true);
    
    // Determine what type of page we're on
    setIsCategory(!!categoryName);
    setIsBrand(!!brandName);
    setIsProduct(!!productId);
    
    // Get brand filter from URL query params if present
    const queryParams = new URLSearchParams(location.search);
    const brandParam = queryParams.get('brand');
    setFilterBrand(brandParam);
    
    // Simulate API call delay
    setTimeout(() => {
      let modelProducts = [];
      
      if (productId) {
        // Get specific product by ID
        const product = getProductById(parseInt(productId));
        setSingleProduct(product);
        modelProducts = product ? [product] : [];
      }
      else if (categoryName) {
        // Get products by category
        modelProducts = getProductsByCategory(categoryName, brandParam);
      }
      else if (brandName) {
        // Get products by brand
        modelProducts = getProductsByBrand(brandName);
      }
      else {
        // Get products by brand and model
        modelProducts = getProductsForModel(brand, model);
      }
      
      setProducts(modelProducts);
      setLoading(false);
    }, 500);
  }, [brand, model, categoryName, brandName, productId, location.search]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Get all products from all brands and models
  const getAllProducts = () => {
    const allProducts = [];
    
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

    // Flatten the nested product structure
    Object.keys(productData).forEach(brand => {
      Object.keys(productData[brand]).forEach(model => {
        productData[brand][model].forEach(product => {
          allProducts.push({
            ...product,
            brand: formatBrandName(brand),
            model: formatModelName(model)
          });
        });
      });
    });

    return allProducts;
  };

  // Get product by ID
  const getProductById = (id) => {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === id) || null;
  };

  // Get products by brand
  const getProductsByBrand = (brand) => {
    const formattedBrand = formatBrandName(brand);
    const allProducts = getAllProducts();
    
    // Filter products by brand
    return allProducts.filter(product => 
      product.brand.toLowerCase() === formattedBrand.toLowerCase()
    );
  };

  // Get products by category
  const getProductsByCategory = (category, brandFilter = null) => {
    const formattedCategory = formatCategoryName(category);
    const allProducts = getAllProducts();
    
    // Filter products by category
    let filteredProducts = allProducts.filter(product => 
      product.category.toLowerCase() === formattedCategory.toLowerCase()
    );
    
    // Apply brand filter if provided
    if (brandFilter) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.toLowerCase() === brandFilter.toLowerCase()
      );
    }
    
    return filteredProducts;
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

  // Render product detail view
  const renderProductDetail = () => {
    if (!singleProduct) return null;
    
    return (
      <div className="product-detail">
        <div className="product-detail-image">
          <img 
            src={singleProduct.image} 
            alt={singleProduct.title} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../src/assets/images/Dual-pipe.jpg";
            }}
          />
          <span className="product-category">{singleProduct.category}</span>
        </div>
        <div className="product-detail-info">
          <h2>{singleProduct.title}</h2>
          <p className="product-for">For {singleProduct.brand} {singleProduct.model}</p>
          <div className="product-price">₱ {singleProduct.price.toFixed(2)}</div>
          <p className="product-description">
            High-quality {singleProduct.category.toLowerCase()} part designed specifically for your {singleProduct.brand} {singleProduct.model}.
            Provides excellent performance and durability.
          </p>
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(singleProduct)}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="car-model-products">
      <div className="car-model-header">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt; 
          
          {isProduct && singleProduct && (
            <>
              <Link to={`/category/${singleProduct.category.toLowerCase()}`}>{singleProduct.category}</Link> &gt;
              <span>{singleProduct.title}</span>
            </>
          )}
          {isCategory && (
            <>
              <span>{formatCategoryName(categoryName)} Parts</span>
              {filterBrand && <> &gt; <span>{formatBrandName(filterBrand)}</span></>}
            </>
          )}
          {isBrand && (
            <span>{formatBrandName(brandName)} Parts</span>
          )}
          {!isProduct && !isCategory && !isBrand && (
            <span>{formatModelName(model)}</span>
          )}
        </div>
        
        {isProduct && singleProduct ? (
          <h1>{singleProduct.title}</h1>
        ) : isCategory ? (
          <h1>
            {filterBrand 
              ? `${formatBrandName(filterBrand)} ${formatCategoryName(categoryName)} Parts` 
              : `${formatCategoryName(categoryName)} Parts`}
          </h1>
        ) : isBrand ? (
          <h1>{formatBrandName(brandName)} Parts</h1>
        ) : (
          <h1>{formatBrandName(brand)} {formatModelName(model)} Parts</h1>
        )}
        
        {isProduct && singleProduct ? (
          <p>High-quality {singleProduct.category.toLowerCase()} part for your vehicle.</p>
        ) : isCategory ? (
          <p>
            {filterBrand 
              ? `Find high-quality ${formatCategoryName(categoryName)} parts for your ${formatBrandName(filterBrand)} vehicles.`
              : `Find high-quality ${formatCategoryName(categoryName)} parts for your vehicle.`}
          </p>
        ) : isBrand ? (
          <p>Find high-quality parts and accessories for your {formatBrandName(brandName)} vehicles.</p>
        ) : (
          <p>Find high-quality performance and replacement parts for your {formatBrandName(brand)} {formatModelName(model)}.</p>
        )}
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
              {isProduct ? (
                <p>Product not found. Please check the product ID or contact us for assistance.</p>
              ) : isCategory ? (
                <p>
                  {filterBrand 
                    ? `No ${formatCategoryName(categoryName)} products found for ${formatBrandName(filterBrand)}. Please check back later or contact us for assistance.`
                    : `No ${formatCategoryName(categoryName)} products found. Please check back later or contact us for assistance.`}
                </p>
              ) : isBrand ? (
                <p>No products found for {formatBrandName(brandName)}. Please check back later or contact us for assistance.</p>
              ) : (
                <p>No products found for this model. Please check back later or contact us for assistance.</p>
              )}
            </div>
          ) : (
            <div className="product-categories">
              {isProduct && singleProduct ? (
                renderProductDetail()
              ) : (
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product.id} className="product-item">
                      <Link to={`/product/${product.id}`} className="product-link">
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
                        {(isCategory || isBrand) && product.brand && product.model && (
                          <div className="product-model">For {product.brand} {product.model}</div>
                        )}
                        <div className="product-price">₱ {product.price.toFixed(2)}</div>
                      </Link>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CarModelProducts;
