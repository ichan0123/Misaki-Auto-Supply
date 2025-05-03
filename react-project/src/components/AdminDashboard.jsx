import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import './AdminDashboard.css';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminCustomers from './AdminCustomers';
import AdminReports from './AdminReports';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);
  const [salesData, setSalesData] = useState({
    totalSales: 486,
    ordersToday: 13,
    lowStockItem: 'Newest Style 304',
    topSellingProducts: [
      { id: 1, name: 'Product 1', sales: 120 },
      { id: 2, name: 'Product 2', sales: 110 },
      { id: 3, name: 'Product 3', sales: 80 },
      { id: 4, name: 'Product 4', sales: 95 }
    ],
    lowStockItems: ['Steering Wheel', 'Wiper', 'Tire'],
    recentOrders: [
      { id: '1004', customer: 'Juan Dela Cruz', total: 1980.00, date: '2/24/26' },
      { id: '1003', customer: 'Kendrick Lamar', total: 370.00, date: '2/24/26' },
      { id: '1002', customer: 'Adrian Veidt', total: 550.00, date: '2/24/26' },
      { id: '1001', customer: 'Elliot Alderson', total: 560.00, date: '2/24/26' }
    ]
  });

  // Check if user is admin, if not redirect to home
  useEffect(() => {
    // In a real app, this would check a token or session
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminData');
    navigate('/');
  };

  if (!adminUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src="/misaki-logo.png" alt="Misaki Auto Supply" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin">
                <span className="icon">🏠</span>
                Homepage
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <span className="icon">🚗</span>
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <span className="icon">🛒</span>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/admin/customers">
                <span className="icon">👥</span>
                Customers
              </Link>
            </li>
            <li>
              <Link to="/admin/reports">
                <span className="icon">📊</span>
                Reports
              </Link>
            </li>
          </ul>
        </nav>
        <div className="admin-logout">
          <button onClick={handleLogout} className="logout-btn">
            <span className="icon">🚪</span> Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="admin-header">
          <h1>
            {location.pathname === '/admin' && 'Admin Dashboard'}
            {location.pathname === '/admin/products' && 'Product Management'}
            {location.pathname === '/admin/orders' && 'Order Management'}
            {location.pathname === '/admin/customers' && 'Customer Management'}
            {location.pathname === '/admin/reports' && 'Reports & Analytics'}
          </h1>
          <div className="admin-user">
            <span>Logged in as: {adminUser.email}</span>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={
            <>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Total Sales of the Month:</h3>
                  <div className="stat-value">{salesData.totalSales}</div>
                </div>
                <div className="stat-card">
                  <h3>Orders Made Today:</h3>
                  <div className="stat-value">{salesData.ordersToday}</div>
                </div>
                <div className="stat-card">
                  <h3>Recent Low Stock:</h3>
                  <div className="stat-value">{salesData.lowStockItem} ...</div>
                </div>
              </div>

              <div className="dashboard-charts">
                <div className="chart-card">
                  <h3>Top Selling Products:</h3>
                  <div className="bar-chart">
                    {salesData.topSellingProducts.map((product) => (
                      <div key={product.id} className="bar-container">
                        <div 
                          className="bar" 
                          style={{ height: `${(product.sales / 120) * 100}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Low Stock Items:</h3>
                  <ul className="low-stock-list">
                    {salesData.lowStockItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="recent-orders">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total Cost</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>₱ {order.total.toFixed(2)}</td>
                        <td>{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          } />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/customers" element={<AdminCustomers />} />
          <Route path="/reports" element={<AdminReports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;