import React, { useState, useEffect } from "react";
import "../components/AdminDashboard.css";
import "./AdminCustomers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faCalendarAlt, faShoppingCart, faDollarSign, faCheckCircle, faTimes, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const mockCustomers = [
  { id: 1, name: 'Juan Dela Cruz', email: 'juan@email.com', phone: '09171234567', joinDate: '2025-01-15', orders: 5, totalSpent: 4500.00, status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '09281234567', joinDate: '2025-02-20', orders: 3, totalSpent: 2100.00, status: 'active' },
  { id: 3, name: 'Kendrick Lamar', email: 'kendrick@email.com', phone: '09391234567', joinDate: '2025-03-10', orders: 1, totalSpent: 370.00, status: 'inactive' },
  { id: 4, name: 'Adrian Veidt', email: 'adrian@email.com', phone: '09451234567', joinDate: '2025-03-25', orders: 2, totalSpent: 1250.00, status: 'active' },
];

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [customerFilter, setCustomerFilter] = useState("all");
  const [customerSearch, setCustomerSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    setCustomers(mockCustomers);
    setLoading(false);
  }, []);

  const loadCustomers = () => {
    setCustomers(mockCustomers);
  };

  const handleViewCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (customerId, newStatus) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, status: newStatus } : c));
    alert(`Customer status updated to ${newStatus}`);
    setIsModalOpen(false);
  };

  const handleCustomerFilterChange = (e) => {
    setCustomerFilter(e.target.value);
  };

  const handleCustomerSearchChange = (e) => {
    setCustomerSearch(e.target.value);
  };

  const filteredCustomers = customers
    .filter(customer => customerFilter === "all" || customer.status === customerFilter)
    .filter(customer => {
      if (!customerSearch) return true;
      const searchLower = customerSearch.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchLower)
      );
    });

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-button" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Customer Details Component
  const CustomerDetails = ({ customer, onClose, onStatusUpdate }) => {
    const [status, setStatus] = useState(customer.status);
    
    const handleStatusChange = (e) => {
      setStatus(e.target.value);
    };
    
    const handleUpdate = () => {
      onStatusUpdate(customer.id, status);
    };
    
    return (
      <div className="customer-details">
        <div className="customer-details-grid">
          <div className="customer-info">
            <h4>Customer Information</h4>
            <div className="info-item">
              <FontAwesomeIcon icon={faUser} className="info-icon" />
              <div className="info-content">
                <span className="info-label">ID</span>
                <span className="info-value">{customer.id}</span>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faUser} className="info-icon" />
              <div className="info-content">
                <span className="info-label">Name</span>
                <span className="info-value">{customer.name}</span>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{customer.email}</span>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faPhone} className="info-icon" />
              <div className="info-content">
                <span className="info-label">Phone</span>
                <span className="info-value">{customer.phone}</span>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
              <div className="info-content">
                <span className="info-label">Join Date</span>
                <span className="info-value">{customer.joinDate}</span>
              </div>
            </div>
            <div className="info-item">
              <FontAwesomeIcon icon={customer.status === "active" ? faCheckCircle : faTimes} className="info-icon" />
              <div className="info-content">
                <span className="info-label">Status</span>
                <span className={`status-badge ${customer.status}`}>
                  {customer.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="customer-stats">
            <h4>Customer Statistics</h4>
            <div className="stats-item">
              <FontAwesomeIcon icon={faShoppingCart} className="stats-icon" />
              <div className="stats-content">
                <span className="stats-label">Total Orders</span>
                <span className="stats-value">{customer.orders}</span>
              </div>
            </div>
            <div className="stats-item">
              <FontAwesomeIcon icon={faDollarSign} className="stats-icon" />
              <div className="stats-content">
                <span className="stats-label">Total Spent</span>
                <span className="stats-value"> {parseFloat(customer.totalSpent).toFixed(2)}</span>
              </div>
            </div>
            <div className="stats-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="stats-icon" />
              <div className="stats-content">
                <span className="stats-label">Last Order</span>
                <span className="stats-value">{customer.lastOrder || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="status-update">
          <h4>Update Status</h4>
          <div className="status-controls">
            <select value={status} onChange={handleStatusChange} className="status-select">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="update-status-button" onClick={handleUpdate}>
              <FontAwesomeIcon icon={faCheckCircle} />
              Update Status
            </button>
          </div>
        </div>
        
        <div className="form-actions">
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Customer Management</h2>
        <div className="search-filter-container">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              value={customerSearch}
              onChange={handleCustomerSearchChange}
            />
          </div>
          <div className="filter-controls">
            <label>Status:</label>
            <select value={customerFilter} onChange={handleCustomerFilterChange}>
              <option value="all">All Customers</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.joinDate}</td>
                <td>{customer.orders}</td>
                <td> {customer.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td><span className={`status-badge ${customer.status}`}>{customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button" onClick={() => handleViewCustomer(customer)}>View Details</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan="9" style={{textAlign: "center", padding: "20px"}}>No customers match the selected criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Customer Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Customer Details - ${currentCustomer?.name || ""}`}
      >
        {currentCustomer && (
          <CustomerDetails 
            customer={currentCustomer} 
            onClose={() => setIsModalOpen(false)} 
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminCustomers;
