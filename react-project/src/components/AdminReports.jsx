import React, { useState } from 'react';
import '../components/AdminDashboard.css';

const AdminReports = () => {
  const [reportType, setReportType] = useState('sales');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Vortex Exhaust Bent Pipe',
      category: 'Exhaust',
      price: 680.00,
      stock: 24,
      sales: 120,
      image: '/images/products/vortex-exhaust.jpg'
    },
    {
      id: 2,
      name: 'MagnaFlow Performance Exhaust',
      category: 'Exhaust',
      price: 700.00,
      stock: 18,
      sales: 102,
      image: '/images/products/magnaflow-exhaust.jpg'
    },
    {
      id: 5,
      name: 'Sport Brake Pads',
      category: 'Brakes',
      price: 320.00,
      stock: 5,
      sales: 84,
      image: '/images/products/brake-pads.jpg'
    }
  ]);

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

  const [salesData, setSalesData] = useState({
    dailySales: [
      { date: 'Apr 26', amount: 1200 },
      { date: 'Apr 27', amount: 980 },
      { date: 'Apr 28', amount: 1350 },
      { date: 'Apr 29', amount: 890 },
      { date: 'Apr 30', amount: 1100 },
      { date: 'May 1', amount: 1450 },
      { date: 'May 2', amount: 1680 }
    ],
    categorySales: [
      { category: 'Exhaust', amount: 4250 },
      { category: 'Brakes', amount: 3180 },
      { category: 'Engine', amount: 1920 },
      { category: 'Suspension', amount: 1650 },
      { category: 'Accessories', amount: 950 }
    ]
  });

  // Report handlers
  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleExportReport = () => {
    alert(`Exporting ${reportType} report...`);
    // In a real app, this would generate and download a report
  };

  // Calculate report summaries
  const totalSales = salesData.dailySales.reduce((sum, day) => sum + day.amount, 0);
  const averageSales = totalSales / salesData.dailySales.length;
  const highestSales = Math.max(...salesData.dailySales.map(day => day.amount));
  const lowestSales = Math.min(...salesData.dailySales.map(day => day.amount));

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Reports & Analytics</h2>
        <div className="report-controls">
          <div className="report-selector">
            <select value={reportType} onChange={handleReportTypeChange}>
              <option value="sales">Sales Report</option>
              <option value="products">Product Performance</option>
              <option value="categories">Category Analysis</option>
              <option value="customers">Customer Insights</option>
            </select>
          </div>
          <button className="export-button" onClick={handleExportReport}>
            Export Report
          </button>
        </div>
      </div>
      
      <div className="report-content">
        {reportType === 'sales' && (
          <div className="sales-report">
            <div className="report-summary">
              <div className="summary-card">
                <h3>Total Sales</h3>
                <div className="summary-value">₱ {totalSales.toLocaleString()}</div>
              </div>
              <div className="summary-card">
                <h3>Average Sales</h3>
                <div className="summary-value">₱ {averageSales.toFixed(2)}</div>
              </div>
              <div className="summary-card">
                <h3>Highest Sales</h3>
                <div className="summary-value">₱ {highestSales.toLocaleString()}</div>
              </div>
              <div className="summary-card">
                <h3>Lowest Sales</h3>
                <div className="summary-value">₱ {lowestSales.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Sales Trend</h3>
              <div className="sales-chart">
                {salesData.dailySales.map((day, index) => (
                  <div className="chart-bar-container" key={day.date}>
                    <div 
                      className="chart-bar" 
                      style={{ 
                        height: `${(day.amount / highestSales) * 100}%`,
                        backgroundColor: day.amount === highestSales ? '#4CAF50' : '#004AAD'
                      }}
                    ></div>
                    <div className="chart-label">{day.date}</div>
                    <div className="chart-value">₱ {day.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'products' && (
          <div className="product-report">
            <div className="report-summary">
              <div className="summary-card">
                <h3>Total Products</h3>
                <div className="summary-value">{products.length}</div>
              </div>
              <div className="summary-card">
                <h3>Low Stock Items</h3>
                <div className="summary-value">{products.filter(p => p.stock <= 5).length}</div>
              </div>
              <div className="summary-card">
                <h3>Top Category</h3>
                <div className="summary-value">Exhaust</div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Top Selling Products</h3>
              <div className="sales-chart">
                {products
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 5)
                  .map((product, index) => (
                    <div className="chart-bar-container" key={product.id}>
                      <div 
                        className="chart-bar" 
                        style={{ 
                          height: `${(product.sales / products[0].sales) * 100}%`,
                          backgroundColor: index === 0 ? '#4CAF50' : '#004AAD'
                        }}
                      ></div>
                      <div className="chart-label">{product.name.split(' ')[0]}</div>
                      <div className="chart-value">{product.sales} units</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'categories' && (
          <div className="category-report">
            <div className="report-summary">
              <div className="summary-card">
                <h3>Total Categories</h3>
                <div className="summary-value">{salesData.categorySales.length}</div>
              </div>
              <div className="summary-card">
                <h3>Best Selling Category</h3>
                <div className="summary-value">{salesData.categorySales[0].category}</div>
              </div>
              <div className="summary-card">
                <h3>Highest Revenue</h3>
                <div className="summary-value">₱ {salesData.categorySales[0].amount.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Sales by Category</h3>
              <div className="sales-chart">
                {salesData.categorySales.map((category, index) => (
                  <div className="chart-bar-container" key={category.category}>
                    <div 
                      className="chart-bar" 
                      style={{ 
                        height: `${(category.amount / salesData.categorySales[0].amount) * 100}%`,
                        backgroundColor: index === 0 ? '#4CAF50' : '#004AAD'
                      }}
                    ></div>
                    <div className="chart-label">{category.category}</div>
                    <div className="chart-value">₱ {category.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {reportType === 'customers' && (
          <div className="customer-report">
            <div className="report-summary">
              <div className="summary-card">
                <h3>Total Customers</h3>
                <div className="summary-value">{customers.length}</div>
              </div>
              <div className="summary-card">
                <h3>Active Customers</h3>
                <div className="summary-value">{customers.filter(c => c.status === 'active').length}</div>
              </div>
              <div className="summary-card">
                <h3>Avg. Order Value</h3>
                <div className="summary-value">₱ 966.67</div>
              </div>
            </div>
            
            <div className="chart-container">
              <h3>Top Customers by Spend</h3>
              <div className="sales-chart">
                {customers
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div className="chart-bar-container" key={customer.id}>
                      <div 
                        className="chart-bar" 
                        style={{ 
                          height: `${(customer.totalSpent / customers[0].totalSpent) * 100}%`,
                          backgroundColor: index === 0 ? '#4CAF50' : '#004AAD'
                        }}
                      ></div>
                      <div className="chart-label">{customer.name.split(' ')[0]}</div>
                      <div className="chart-value">₱ {customer.totalSpent.toFixed(2)}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;