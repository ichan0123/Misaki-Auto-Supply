import React, { useState, useEffect } from "react";
import "./AdminInventory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AdminInventory = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Honda Civic Exhaust Pipe",
      category: "Exhaust Systems",
      sku: "HC-EX-001",
      currentStock: 15,
      minStock: 10,
      maxStock: 50,
      unitPrice: 2500.00,
      supplier: "Auto Parts Direct",
      lastRestocked: "2024-01-15",
      status: "in-stock"
    },
    {
      id: 2,
      name: "Toyota Corolla Air Filter",
      category: "Engine Parts",
      sku: "TC-AF-002",
      currentStock: 3,
      minStock: 5,
      maxStock: 30,
      unitPrice: 450.00,
      supplier: "Filter Pro",
      lastRestocked: "2024-01-10",
      status: "low-stock"
    },
    {
      id: 3,
      name: "Mazda 3 Brake Pads",
      category: "Brake Systems",
      sku: "M3-BP-003",
      currentStock: 0,
      minStock: 8,
      maxStock: 25,
      unitPrice: 1200.00,
      supplier: "Brake Masters",
      lastRestocked: "2024-01-05",
      status: "out-of-stock"
    },
    {
      id: 4,
      name: "Nissan Altima Oil Filter",
      category: "Engine Parts",
      sku: "NA-OF-004",
      currentStock: 22,
      minStock: 12,
      maxStock: 40,
      unitPrice: 380.00,
      supplier: "Oil Tech",
      lastRestocked: "2024-01-20",
      status: "in-stock"
    },
    {
      id: 5,
      name: "Universal Steering Wheel",
      category: "Interior Parts",
      sku: "USW-005",
      currentStock: 6,
      minStock: 8,
      maxStock: 20,
      unitPrice: 1800.00,
      supplier: "Interior Plus",
      lastRestocked: "2024-01-12",
      status: "low-stock"
    },
    {
      id: 6,
      name: "Dual Pipe Exhaust System",
      category: "Exhaust Systems",
      sku: "DPE-006",
      currentStock: 18,
      minStock: 5,
      maxStock: 35,
      unitPrice: 3200.00,
      supplier: "Exhaust Experts",
      lastRestocked: "2024-01-18",
      status: "in-stock"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    currentStock: "",
    minStock: "",
    maxStock: "",
    unitPrice: "",
    supplier: "",
    lastRestocked: ""
  });

  const categories = ["Exhaust Systems", "Engine Parts", "Brake Systems", "Interior Parts", "Exterior Parts"];

  useEffect(() => {
    // Update status based on stock levels
    setInventory(prev => prev.map(item => ({
      ...item,
      status: item.currentStock === 0 ? "out-of-stock" :
              item.currentStock <= item.minStock ? "low-stock" : "in-stock"
    })));
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      category: "",
      sku: "",
      currentStock: "",
      minStock: "",
      maxStock: "",
      unitPrice: "",
      supplier: "",
      lastRestocked: new Date().toISOString().split("T")[0]
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      sku: item.sku,
      currentStock: item.currentStock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      unitPrice: item.unitPrice,
      supplier: item.supplier,
      lastRestocked: item.lastRestocked
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingItem) {
      // Update existing item
      setInventory(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, currentStock: parseInt(formData.currentStock), minStock: parseInt(formData.minStock), maxStock: parseInt(formData.maxStock), unitPrice: parseFloat(formData.unitPrice) }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...inventory.map(i => i.id)) + 1,
        ...formData,
        currentStock: parseInt(formData.currentStock),
        minStock: parseInt(formData.minStock),
        maxStock: parseInt(formData.maxStock),
        unitPrice: parseFloat(formData.unitPrice),
        status: formData.currentStock <= formData.minStock ? "low-stock" : "in-stock"
      };
      setInventory(prev => [...prev, newItem]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      "in-stock": "status-in-stock",
      "low-stock": "status-low-stock",
      "out-of-stock": "status-out-of-stock"
    };
    return <span className={`status-badge ${statusClasses[status]}`}>{status.replace("-", " ")}</span>;
  };

  const getTotalValue = () => {
    return inventory.reduce((total, item) => total + (item.currentStock * item.unitPrice), 0);
  };

  const getLowStockCount = () => {
    return inventory.filter(item => item.status === "low-stock" || item.status === "out-of-stock").length;
  };

  return (
    <div className="admin-inventory">
      <div className="inventory-header">
        <div className="inventory-stats">
          <div className="stat-card">
            <h3>Total Items</h3>
            <div className="stat-value">{inventory.length}</div>
          </div>
          <div className="stat-card">
            <h3>Total Value</h3>
            <div className="stat-value">{getTotalValue().toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <h3>Low Stock Items</h3>
            <div className="stat-value">{getLowStockCount()}</div>
          </div>
        </div>
        
        <div className="inventory-controls">
          <button className="add-btn" onClick={handleAddNew}>
            <span className="icon"></span> Add New Item
          </button>
        </div>
      </div>

      <div className="filter-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="icon"></span>
        </div>
        
        <div className="filter-group">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="inventory-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Min/Max</th>
              <th>Unit Price</th>
              <th>Total Value</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => (
              <tr key={item.id}>
                <td><strong>{item.sku}</strong></td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <span className={`stock-level ${item.status}`}>
                    {item.currentStock}
                  </span>
                </td>
                <td>{item.minStock}/{item.maxStock}</td>
                <td>{item.unitPrice.toLocaleString()}</td>
                <td>{(item.currentStock * item.unitPrice).toLocaleString()}</td>
                <td>{item.supplier}</td>
                <td>{getStatusBadge(item.status)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(item)} title="Edit">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)} title="Delete">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredInventory.length === 0 && (
          <div className="no-results">
            No inventory items found matching your criteria.
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productName">Product Name *</label>
                  <input
                    id="productName"
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productSku">SKU *</label>
                  <input
                    id="productSku"
                    type="text"
                    className="form-control"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    placeholder="Enter product SKU"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="productCategory">Category *</label>
                  <select
                    id="productCategory"
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="productSupplier">Supplier *</label>
                  <input
                    id="productSupplier"
                    type="text"
                    className="form-control"
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    placeholder="Enter supplier name"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="currentStock">Current Stock *</label>
                  <input
                    id="currentStock"
                    type="number"
                    className="form-control"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({...formData, currentStock: e.target.value})}
                    placeholder="Enter current stock"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="minStock">Min Stock *</label>
                  <input
                    id="minStock"
                    type="number"
                    className="form-control"
                    value={formData.minStock}
                    onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                    placeholder="Enter minimum stock"
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxStock">Max Stock *</label>
                  <input
                    id="maxStock"
                    type="number"
                    className="form-control"
                    value={formData.maxStock}
                    onChange={(e) => setFormData({...formData, maxStock: e.target.value})}
                    placeholder="Enter maximum stock"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="unitPrice">Unit Price () *</label>
                  <input
                    id="unitPrice"
                    type="number"
                    className="form-control"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                    placeholder="Enter unit price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastRestocked">Last Restocked</label>
                  <input
                    id="lastRestocked"
                    type="date"
                    className="form-control"
                    value={formData.lastRestocked}
                    onChange={(e) => setFormData({...formData, lastRestocked: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="close-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="add-btn" onClick={handleSave}>
                {editingItem ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
