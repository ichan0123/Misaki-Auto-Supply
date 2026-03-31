import React, { useState, useEffect } from "react";
import { Link, useNavigate, Routes, Route, useLocation } from "react-router-dom";
import "./AdminDashboard.css";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminCustomers from "./AdminCustomers";
import AdminReports from "./AdminReports";
import AdminInventory from "./AdminInventory";

const mockDashboardData = {
  totalSales: 125400,
  ordersToday: 8,
  lowStockItems: ['HKS Exhaust Muffler', 'Sport Brake Pads', 'Oil Filter'],
  activeCustomers: 42,
  topSellingProducts: [
    { id: 1, name: 'Road Fit Pipe', sales: 24 },
    { id: 2, name: 'Vortex Exhaust', sales: 18 },
    { id: 3, name: 'Air Filter Kit', sales: 15 },
    { id: 4, name: 'Brake Pads', sales: 12 },
    { id: 5, name: 'Cold Air Intake', sales: 9 },
  ],
  recentOrders: [
    { id: 1004, customer: 'Juan Dela Cruz', total: 1980.00, date: '2025-05-01', status: 'pending' },
    { id: 1003, customer: 'Kendrick Lamar', total: 370.00, date: '2025-05-01', status: 'processing' },
    { id: 1002, customer: 'Adrian Veidt', total: 550.00, date: '2025-04-30', status: 'shipped' },
    { id: 1001, customer: 'Maria Santos', total: 800.00, date: '2025-04-29', status: 'delivered' },
  ]
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    ordersToday: 0,
    lowStockItems: [],
    activeCustomers: 0,
    topSellingProducts: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    } else {
      // For demo purposes, set a default admin user
      const defaultAdmin = { email: 'admin@misaki.com' };
      localStorage.setItem('adminData', JSON.stringify(defaultAdmin));
      setAdminUser(defaultAdmin);
    }
    setSalesData(mockDashboardData);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/");
  };

  if (!adminUser) {
    return <div className="loading">Loading...</div>;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src="/misaki-logo.png" alt="Misaki Auto Supply" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={isActive("/admin") ? "active" : ""}>
              <Link to="/admin">
                <span className="icon">📊</span>
                Dashboard
              </Link>
            </li>
            <li className={isActive("/admin/products") ? "active" : ""}>
              <Link to="/admin/products">
                <span className="icon">📦</span>
                Products
              </Link>
            </li>
            <li className={isActive("/admin/inventory") ? "active" : ""}>
              <Link to="/admin/inventory">
                <span className="icon">📋</span>
                Inventory
              </Link>
            </li>
            <li className={isActive("/admin/orders") ? "active" : ""}>
              <Link to="/admin/orders">
                <span className="icon">🛒</span>
                Orders
              </Link>
            </li>
            <li className={isActive("/admin/customers") ? "active" : ""}>
              <Link to="/admin/customers">
                <span className="icon">👥</span>
                Customers
              </Link>
            </li>
            <li className={isActive("/admin/reports") ? "active" : ""}>
              <Link to="/admin/reports">
                <span className="icon">📈</span>
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
            {location.pathname === "/admin" && "Admin Dashboard"}
            {location.pathname === "/admin/products" && "Product Management"}
            {location.pathname === "/admin/inventory" && "Inventory Management"}
            {location.pathname === "/admin/orders" && "Order Management"}
            {location.pathname === "/admin/customers" && "Customer Management"}
            {location.pathname === "/admin/reports" && "Reports & Analytics"}
          </h1>
          <div className="admin-user">
            <span>Logged in as: {adminUser.email}</span>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={
            <>
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner">Loading dashboard...</div>
                </div>
              ) : error ? (
                <div className="error-container">
                  <div className="error-message">⚠️ {error}</div>
                  <button onClick={loadDashboardData} className="retry-button">Retry</button>
                </div>
              ) : (
                <>
                  <div className="dashboard-stats">
                    <div className="stat-card sales">
                      <div className="stat-icon">💰</div>
                      <div className="stat-content">
                        <h3>Total Sales (Month)</h3>
                        <div className="stat-value">₱ {salesData.totalSales.toLocaleString()}</div>
                        <div className="stat-change positive">Current month</div>
                      </div>
                    </div>
                    <div className="stat-card orders">
                      <div className="stat-icon">📦</div>
                      <div className="stat-content">
                        <h3>Orders Today</h3>
                        <div className="stat-value">{salesData.ordersToday}</div>
                        <div className="stat-change positive">Today's orders</div>
                      </div>
                    </div>
                    <div className="stat-card stock">
                      <div className="stat-icon">⚠️</div>
                      <div className="stat-content">
                        <h3>Low Stock Alert</h3>
                        <div className="stat-value">{salesData.lowStockItems.length} items</div>
                        <div className="stat-change negative">Needs attention</div>
                      </div>
                    </div>
                    <div className="stat-card customers">
                      <div className="stat-icon">👥</div>
                      <div className="stat-content">
                        <h3>Active Customers</h3>
                        <div className="stat-value">{salesData.activeCustomers}</div>
                        <div className="stat-change positive">Registered users</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!loading && !error && (
                <>
                  <div className="dashboard-charts">
                    <div className="chart-card">
                      <div className="chart-header">
                        <h3>Top Selling Products</h3>
                        <span className="chart-subtitle">All time</span>
                      </div>
                      <div className="bar-chart">
                        {salesData.topSellingProducts && salesData.topSellingProducts.length > 0 ? (
                          salesData.topSellingProducts.map((product, index) => {
                            const maxSales = Math.max(...salesData.topSellingProducts.map(p => p.sales));
                            return (
                              <div key={product.id} className="bar-container">
                                <div 
                                  className="bar" 
                                  style={{ 
                                    height: `${(product.sales / maxSales) * 100}%`,
                                    backgroundColor: index === 0 ? '#4CAF50' : '#004AAD'
                                  }}
                                >
                                  <span className="bar-value">{product.sales}</span>
                                </div>
                                <span className="bar-label">{product.name.substring(0, 10)}</span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="no-data">No sales data yet</div>
                        )}
                      </div>
                    </div>
                    <div className="chart-card">
                      <div className="chart-header">
                        <h3>Low Stock Alert</h3>
                        <span className="chart-subtitle">Requires restocking</span>
                      </div>
                      <ul className="low-stock-list">
                        {salesData.lowStockItems && salesData.lowStockItems.length > 0 ? (
                          salesData.lowStockItems.map((item, index) => (
                            <li key={index}>
                              <span className="stock-icon">⚠️</span>
                              <span className="stock-name">{item}</span>
                              <span className="stock-badge">Low</span>
                            </li>
                          ))
                        ) : (
                          <li>
                            <span className="stock-icon">✅</span>
                            <span className="stock-name">All items in stock</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {!loading && !error && (
                <div className="recent-orders">
                  <div className="section-header-inline">
                    <h3>Recent Orders</h3>
                    <Link to="/admin/orders" className="view-all-link">View All →</Link>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total Cost</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.recentOrders && salesData.recentOrders.length > 0 ? (
                        salesData.recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td><strong>#{order.id}</strong></td>
                            <td>{order.customer}</td>
                            <td><strong>₱ {parseFloat(order.total).toFixed(2)}</strong></td>
                            <td>{order.date}</td>
                            <td>
                              <span className={`status-badge status-${order.status}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                            No orders yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          } />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/inventory" element={<AdminInventory />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/customers" element={<AdminCustomers />} />
          <Route path="/reports" element={<AdminReports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
