import React, { useState } from 'react';
import '../components/AdminDashboard.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: '1004',
      customer: 'Juan Dela Cruz',
      date: '2025-05-01',
      total: 1980.00,
      status: 'pending',
      items: [
        { name: 'Vortex Exhaust Bent Pipe', quantity: 2, price: 680.00 },
        { name: 'Sport Brake Pads', quantity: 2, price: 320.00 }
      ]
    },
    {
      id: '1003',
      customer: 'Kendrick Lamar',
      date: '2025-05-01',
      total: 370.00,
      status: 'processing',
      items: [
        { name: 'Sport Brake Pads', quantity: 1, price: 320.00 },
        { name: 'Oil Filter', quantity: 1, price: 50.00 }
      ]
    },
    {
      id: '1002',
      customer: 'Adrian Veidt',
      date: '2025-04-30',
      total: 550.00,
      status: 'shipped',
      items: [
        { name: 'Performance Air Filter', quantity: 1, price: 550.00 }
      ]
    }
  ]);
  
  const [orderFilter, setOrderFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Order handlers
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleOrderFilterChange = (e) => {
    setOrderFilter(e.target.value);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order status updated to ${newStatus}`);
    setIsModalOpen(false);
  };

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === orderFilter);

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

  // Order Details Component
  const OrderDetails = ({ order, onClose, onStatusUpdate }) => {
    const [status, setStatus] = useState(order.status);
    
    const handleStatusChange = (e) => {
      setStatus(e.target.value);
    };
    
    const handleUpdate = () => {
      onStatusUpdate(order.id, status);
    };
    
    return (
      <div className="order-details">
        <div className="order-info">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
          <p><strong>Total:</strong> ₱ {parseFloat(order.total).toFixed(2)}</p>
        </div>
        
        <div className="order-items">
          <h4>Order Items</h4>
          <table className="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₱ {parseFloat(item.price).toFixed(2)}</td>
                  <td>₱ {(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="status-update">
          <h4>Update Status</h4>
          <select value={status} onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="update-status-button" onClick={handleUpdate}>Update</button>
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
        <h2>Order Management</h2>
        <div className="filter-controls">
          <label>Filter by Status:</label>
          <select value={orderFilter} onChange={handleOrderFilterChange}>
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>₱ {order.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td><span className={`status-badge ${order.status}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button" onClick={() => handleViewOrder(order)}>View Details</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No orders match the selected filter</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Order Details Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Order Details - #${currentOrder?.id || ''}`}
      >
        {currentOrder && (
          <OrderDetails 
            order={currentOrder} 
            onClose={() => setIsModalOpen(false)} 
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;