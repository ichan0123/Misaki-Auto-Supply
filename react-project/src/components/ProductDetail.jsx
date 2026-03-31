import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock product images for carousel - in a real app, these would come from the product data
  const getProductImages = (productId) => {
    // Default images for all products
    const defaultImages = [
      "../src/assets/images/Dual-pipe.jpg",
      "../src/assets/images/Vortex Exhaust Bent Pipe.jpg",
      "../src/assets/images/Magnaflow-pipe.jpg",
      "../src/assets/images/hks-exhaust.jpg"
    ];
    
    // Product-specific image sets could be defined here based on productId
    const productSpecificImages = {
      1: [
        "../src/assets/images/Dual-pipe.jpg",
        "../src/assets/images/Dual-pipe-angle.jpg",
        "../src/assets/images/Dual-pipe-installed.jpg",
        "../src/assets/images/Dual-pipe-closeup.jpg"
      ],
      2: [
        "../src/assets/images/Vortex Exhaust Bent Pipe.jpg",
        "../src/assets/images/Vortex-angle.jpg",
        "../src/assets/images/Vortex-installed.jpg",
        "../src/assets/images/Vortex-closeup.jpg"
      ]
      // Add more product-specific image sets as needed
    };
    
    return productSpecificImages[productId] || defaultImages;
  };

  const [productImages, setProductImages] = useState([]);
  
  useEffect(() => {
    // In a real application, you would fetch the product from an API
    // For now, we'll use mock data based on the product ID
    setLoading(true);
    setCurrentImageIndex(0); // Reset image index when product changes
    
    // Simulate API call delay
    setTimeout(() => {
      const mockProduct = getMockProductById(parseInt(productId));
      setProduct(mockProduct);
      
      // Set product images based on product ID
      if (mockProduct) {
        setProductImages(getProductImages(mockProduct.id));
      }
      
      setLoading(false);
    }, 500);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Mock function to get product by ID
  const getMockProductById = (id) => {
    // This is a simplified version of the product data
    const allProducts = [
      {
        id: 1,
        title: "Custom Dual Exhaust Pipe",
        price: 580.0,
        image: "../src/assets/images/Dual-pipe.jpg",
        category: "Exhaust",
        description: "High-quality exhaust system designed for optimal performance and a deep, aggressive sound. Made from premium stainless steel for durability and corrosion resistance.",
        brand: "Misaki",
        model: "Universal",
        rating: 4.5,
        reviews: 9,
        stock: "In stock",
        delivery: "Available",
        specifications: [
          "Material: Stainless Steel",
          "Diameter: 2.5 inches",
          "Style: Dual Exit",
          "Finish: Black Chrome"
        ]
      },
      {
        id: 2,
        title: "Vortex Exhaust Bent Pipe",
        price: 680.0,
        image: "../src/assets/images/Vortex Exhaust Bent Pipe.jpg",
        category: "Exhaust",
        description: "Advanced vortex design for improved exhaust flow and performance gains. Features precision bends for perfect fitment.",
        brand: "Vortex",
        model: "Universal",
        rating: 4.7,
        reviews: 12,
        stock: "In stock",
        delivery: "Available",
        specifications: [
          "Material: T304 Stainless Steel",
          "Diameter: 3 inches",
          "Style: Performance Bent",
          "Finish: Polished"
        ]
      },
      {
        id: 3,
        title: "MagnaFlow Performance Exhaust Tailpipe 15395",
        price: 700.0,
        image: "../src/assets/images/Magnaflow-pipe.jpg",
        category: "Exhaust",
        description: "Premium MagnaFlow exhaust system for enhanced performance and distinctive sound. Constructed with high-quality materials for long-lasting durability.",
        brand: "MagnaFlow",
        model: "Universal",
        rating: 4.8,
        reviews: 15,
        stock: "In stock",
        delivery: "Available",
        specifications: [
          "Material: Stainless Steel",
          "Diameter: 2.75 inches",
          "Style: Performance",
          "Finish: Polished"
        ]
      },
      {
        id: 4,
        title: "HKS Hi-Power Exhaust System",
        price: 950.0,
        image: "../src/assets/images/hks-exhaust.jpg",
        category: "Exhaust",
        description: "Premium HKS exhaust system offering significant performance gains and aggressive sound. Engineered for optimal flow and reduced backpressure.",
        brand: "HKS",
        model: "Universal",
        rating: 4.9,
        reviews: 21,
        stock: "In stock",
        delivery: "Available",
        specifications: [
          "Material: SUS304 Stainless Steel",
          "Diameter: 3 inches",
          "Style: Performance",
          "Finish: Titanium Tip"
        ]
      },
    ];
    
    return allProducts.find(product => product.id === id) || null;
  };

  if (loading) {
    return (
      <div className="product-detail-container loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> &gt; 
        <Link to={`/category/${product.category.toLowerCase()}`}>{product.category}</Link> &gt;
        <span>{product.title}</span>
      </div>
      
      <div className="product-detail-content">
        <div className="product-images">
          <div className="main-image">
            <button className="carousel-btn prev" onClick={prevImage} aria-label="Previous image">❮</button>
            <img 
              src={productImages[currentImageIndex]} 
              alt={`${product.title} - View ${currentImageIndex + 1}`} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = product.image;
              }}
            />
            <button className="carousel-btn next" onClick={nextImage} aria-label="Next image">❯</button>
          </div>
          <div className="thumbnail-container">
            {productImages.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => selectImage(index)}
                aria-label={`View image ${index + 1}`}
                role="button"
                tabIndex={0}
              >
                <img 
                  src={image} 
                  alt={`${product.title} - Thumbnail ${index + 1}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = product.image;
                  }}
                />
                {currentImageIndex === index && <div className="active-indicator"></div>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <h1>{product.title}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                  ★
                </span>
              ))}
              {product.rating % 1 > 0 && (
                <span className="star half-filled">★</span>
              )}
            </div>
            <span className="reviews-count">({product.reviews})</span>
          </div>
          
          <div className="product-price">₱{product.price.toFixed(2)}</div>
          
          <div className="availability">
            <div className="stock">
              <span className="label">Availability:</span>
              <span className="value in-stock">{product.stock}</span>
            </div>
            <div className="delivery">
              <span className="label">Delivery:</span>
              <span className="value">{product.delivery}</span>
              <span className="see-options">See options at checkout</span>
            </div>
          </div>
          
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          
          <div className="product-specifications">
            <h3>Specifications:</h3>
            <ul>
              {product.specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
          
          <div className="product-meta">
            <div className="meta-item">
              <span className="label">Category:</span>
              <Link to={`/category/${product.category.toLowerCase()}`}>{product.category}</Link>
            </div>
            <div className="meta-item">
              <span className="label">Brand:</span>
              <Link to={`/brand/${product.brand.toLowerCase()}`}>{product.brand}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
