import React, { useState } from 'react';
import '../components/AdminDashboard.css';
import './AdminCustomers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCalendarAlt, faShoppingCart, faDollarSign, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      phone: '+63 912 345 6789',
      joinDate: '2025-01-15',
      orders: 3,
      totalSpent: 1980.00,
      status: 'active',
      lastOrder: '2025-05-01'
    },
    {
      id: 2,
      name: 'Kendrick Lamar',
      email: 'kendrick@example.com',
      phone: '+63 923 456 7890',
      joinDate: '2025-02-20',
      orders: 2,
      totalSpent: 370.00,
      status: 'active',
      lastOrder: '2025-05-01'
    },
    {
      id: 6,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+63 967 890 1234',
      joinDate: '2025-04-25',
      orders: 0,
      totalSpent: 0.00,
      status: 'inactive',
      lastOrder: null
    }
  ]);
  
  const [customerFilter, setCustomerFilter] = useState('all');
  const [customerSearch, setCustomerSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Customer handlers
  const handleViewCustomer = (customer) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCustomerFilterChange = (e) => {
    setCustomerFilter(e.target.value);
  };

  const handleCustomerSearchChange = (e) => {
    setCustomerSearch(e.target.value);
  };

  const handleStatusUpdate = (customerId, newStatus) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId ? { ...customer, status: newStatus } : customer
    ));
    alert(`Customer status updated to ${newStatus}`);
    setIsModalOpen(false);
  };

  const filteredCustomers = customers
    .filter(customer => customerFilter === 'all' || customer.status === customerFilter)
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
            <button className="close-button" onClick={onClose}>×</button>
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
        <div className="customer-info">
          <h4>Customer Information</h4>
          <p>
            <strong><FontAwesomeIcon icon={faUser} /> ID:</strong> 
            {customer.id}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={faUser} /> Name:</strong> 
            {customer.name}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={faEnvelope} /> Email:</strong> 
            {customer.email}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={faPhone} /> Phone:</strong> 
            {customer.phone}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={faCalendarAlt} /> Join Date:</strong> 
            {customer.joinDate}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={status === 'active' ? faCheckCircle : faTimes} /> Status:</strong> 
            <span className={`status-badge ${customer.status}`}>
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </span>
          </p>
        </div>
        
        <div className="customer-stats">
          <h4>Customer Statistics</h4>
          <p>
            <strong><FontAwesomeIcon icon={faShoppingCart} /> Total Orders:</strong> 
            {customer.orders}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={faDollarSign} /> Total Spent:</strong> 
            ₱ {parseFloat(customer.totalSpent).toFixed(2)}
          </p>
          <p>
            <strong><FontAwesomeIcon icon={faCalendarAlt} /> Last Order:</strong> 
            {customer.lastOrder || 'N/A'}
          </p>
        </div>
        
        <div className="status-update">
          <h4>Update Status</h4>
          <select value={status} onChange={handleStatusChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="update-status-button" onClick={handleUpdate}>
            <FontAwesomeIcon icon={status === 'active' ? faCheckCircle : faTimes} /> 
            Update Status
          </button>
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
                <td>₱ {customer.totalSpent.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
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
                <td colSpan="9" style={{textAlign: 'center', padding: '20px'}}>No customers match the selected criteria</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Customer Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Customer Details - ${currentCustomer?.name || ''}`}
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