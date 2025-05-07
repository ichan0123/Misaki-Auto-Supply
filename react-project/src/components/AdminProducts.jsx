import React, { useState, useEffect } from 'react';
import '../components/AdminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faSearch, faExclamationTriangle, faImage, faTag, faDollarSign, faBoxOpen, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminProducts = () => {
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Vortex Exhaust Bent Pipe',
      category: 'Exhaust',
      price: 680.00,
      stock: 24,
      image: '/images/products/vortex-exhaust.jpg'
    },
    {
      id: 2,
      name: 'MagnaFlow Performance Exhaust',
      category: 'Exhaust',
      price: 700.00,
      stock: 18,
      image: '/images/products/magnaflow-exhaust.jpg'
    },
    {
      id: 5,
      name: 'Sport Brake Pads',
      category: 'Brakes',
      price: 320.00,
      stock: 5,
      image: '/images/products/brake-pads.jpg'
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Success message handler
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Filter and search handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Filtered products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Product handlers
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowAddProductForm(!showAddProductForm);
    setIsModalOpen(false);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({...product});
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteItemId(productId);
    setIsConfirmDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    setProducts(products.filter(product => product.id !== deleteItemId));
    setIsConfirmDialogOpen(false);
    setDeleteItemId(null);
    showSuccess('Product deleted successfully');
  };

  const handleProductSubmit = (formData) => {
    // Convert price and stock to numbers
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10)
    };
    
    if (currentProduct) {
      // Edit existing product
      setProducts(products.map(product => 
        product.id === currentProduct.id ? { ...product, ...processedData } : product
      ));
      showSuccess('Product updated successfully');
      setIsModalOpen(false);
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...processedData
      };
      setProducts([...products, newProduct]);
      showSuccess('Product added successfully');
      setShowAddProductForm(false);
    }
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="modal-overlay" onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
        <div className="modal">
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon="times" />
              ×
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Form component for adding/editing products
  const ProductForm = ({ product = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      stock: product.stock || '',
      image: product.image || ''
    });
    const [imagePreview, setImagePreview] = useState(product.image || '');

    useEffect(() => {
      // Update form data when product prop changes
      if (product) {
        setFormData({
          name: product.name || '',
          category: product.category || '',
          price: product.price || '',
          stock: product.stock || '',
          image: product.image || ''
        });
        setImagePreview(product.image || '');
      }
    }, [product]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Update image preview when image URL changes
      if (name === 'image') {
        setImagePreview(value);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faTag} className="form-icon" /> Product Name
            </label>
            <input 
              type="text" 
              id="name"
              name="name" 
              className="form-control"
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">
              <FontAwesomeIcon icon={faTag} className="form-icon" /> Category
            </label>
            <select 
              id="category"
              name="category" 
              className="form-control"
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              <option value="Exhaust">Exhaust</option>
              <option value="Brakes">Brakes</option>
              <option value="Suspension">Suspension</option>
              <option value="Engine">Engine</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">
              <FontAwesomeIcon icon={faDollarSign} className="form-icon" /> Price (₱)
            </label>
            <input 
              type="number" 
              id="price"
              name="price" 
              className="form-control"
              value={formData.price} 
              onChange={handleChange} 
              min="0" 
              step="0.01" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="stock">
              <FontAwesomeIcon icon={faBoxOpen} className="form-icon" /> Stock
            </label>
            <input 
              type="number" 
              id="stock"
              name="stock" 
              className="form-control"
              value={formData.stock} 
              onChange={handleChange} 
              min="0" 
              required 
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="image">
              <FontAwesomeIcon icon={faImage} className="form-icon" /> Image URL
            </label>
            <input 
              type="text" 
              id="image"
              name="image" 
              className="form-control"
              value={formData.image} 
              onChange={handleChange} 
              placeholder="/images/products/example.jpg" 
            />
          </div>
        </div>
        
        {imagePreview && (
          <div className="image-preview-container">
            <label>Image Preview</label>
            <div className="image-preview">
              <img src={imagePreview} alt="Product preview" />
            </div>
          </div>
        )}
        
        <div className="modal-footer">
          <button type="button" className="btn cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn submit-btn">
            <FontAwesomeIcon icon={faCheckCircle} /> {product.id ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    );
  };

  // Confirmation Dialog Component
  const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="confirm-dialog">
        <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
        <p>{message}</p>
        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="btn delete-btn" onClick={onConfirm}>
            <FontAwesomeIcon icon={faTrashAlt} /> Confirm Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Product Management</h2>
        <button className="add-btn" onClick={handleAddProduct}>
          <FontAwesomeIcon icon={showAddProductForm ? faTrashAlt : faPlus} /> 
          {showAddProductForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>
      
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} /> {successMessage}
        </div>
      )}
      
      {/* Add Product Form */}
      {showAddProductForm && (
        <div className="add-product-section">
          <div className="section-header-with-back">
            <button className="back-btn" onClick={() => setShowAddProductForm(false)}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
            <h3>Add New Product</h3>
          </div>
          <ProductForm 
            product={{}} 
            onSubmit={handleProductSubmit} 
            onCancel={() => setShowAddProductForm(false)} 
          />
        </div>
      )}
      
      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="categoryFilter">Category:</label>
          <select 
            id="categoryFilter" 
            value={categoryFilter} 
            onChange={handleCategoryFilterChange}
            className="form-control"
          >
            <option value="all">All Categories</option>
            <option value="Exhaust">Exhaust</option>
            <option value="Brakes">Brakes</option>
            <option value="Suspension">Suspension</option>
            <option value="Engine">Engine</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
      </div>
      
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-results">No products found</td>
              </tr>
            ) : (
              filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className="product-image-container">
                      <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₱ {product.price.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${product.stock <= 5 ? 'status-low-stock' : 'status-in-stock'}`}>
                      {product.stock <= 0 ? 'Out of Stock' : 
                       product.stock <= 5 ? `Low Stock (${product.stock})` : 
                       `In Stock (${product.stock})`}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEditProduct(product)} title="Edit Product">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)} title="Delete Product">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Product Edit Modal (only for editing, not for adding) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentProduct ? `Edit Product: ${currentProduct.name}` : ''}
      >
        <ProductForm 
          product={currentProduct} 
          onSubmit={handleProductSubmit} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
      
      {/* Confirm Delete Dialog */}
      <Modal 
        isOpen={isConfirmDialogOpen} 
        onClose={() => setIsConfirmDialogOpen(false)} 
        title="Confirm Delete"
      >
        <ConfirmDialog 
          message="Are you sure you want to delete this product? This action cannot be undone." 
          onConfirm={confirmDeleteProduct} 
          onCancel={() => setIsConfirmDialogOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default AdminProducts;