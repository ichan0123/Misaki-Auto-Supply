# 🎯 Admin Backend - Complete Guide

## ✅ Ginawa Ko:

### 1. **Backend API Routes** (`backend/routes/admin.js`)

Lahat ng admin features ay may backend na:

#### 📊 Dashboard
- `GET /api/admin/dashboard/stats` - Get all statistics
  - Total sales this month
  - Orders today
  - Low stock items
  - Active customers
  - Top selling products
  - Recent orders

#### 📦 Products Management
- `GET /api/admin/products` - Get all products
- `GET /api/admin/products/:id` - Get single product
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

#### 👥 Customers Management
- `GET /api/admin/customers` - Get all customers
- `GET /api/admin/customers/:id` - Get single customer
- `PATCH /api/admin/customers/:id/status` - Update customer status

#### 🛒 Orders Management
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get single order with items
- `PATCH /api/admin/orders/:id/status` - Update order status

#### 📋 Inventory Management
- `GET /api/admin/inventory` - Get all inventory
- `PATCH /api/admin/inventory/:id/stock` - Update stock

#### 📈 Reports
- `GET /api/admin/reports/sales` - Get sales report
  - Daily sales (last 7 days)
  - Category sales

---

### 2. **Frontend API Service** (`react-project/src/services/api.js`)

Added `adminAPI` with all methods:

```javascript
import { adminAPI } from '../services/api';

// Dashboard
const stats = await adminAPI.getDashboardStats();

// Products
const products = await adminAPI.getProducts();
await adminAPI.createProduct(data);
await adminAPI.updateProduct(id, data);
await adminAPI.deleteProduct(id);

// Customers
const customers = await adminAPI.getCustomers();
await adminAPI.updateCustomerStatus(id, 'active');

// Orders
const orders = await adminAPI.getOrders();
await adminAPI.updateOrderStatus(id, 'shipped');

// Inventory
const inventory = await adminAPI.getInventory();
await adminAPI.updateStock(id, 50);

// Reports
const report = await adminAPI.getSalesReport();
```

---

### 3. **Sample Data Script** (`backend/scripts/insertSampleData.js`)

Para may test data:
- 10 sample products
- 3 sample customers
- Sample orders with items

---

## 🚀 Paano Gamitin:

### Step 1: Insert Sample Data

```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
npm run sample-data
```

This will create:
- ✅ 10 products (different categories)
- ✅ 3 test customers
- ✅ Sample orders

**Test User:**
```
Email: juan@example.com
Password: password123
```

---

### Step 2: Test Admin API

Make sure backend is running:
```bash
cd backend
npm run dev
```

Test endpoints:
```bash
# Login as admin first
curl -X POST http://localhost:5000/api/auth/admin/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@misaki.com\",\"password\":\"admin123\"}"

# Copy the token from response

# Get dashboard stats
curl http://localhost:5000/api/admin/dashboard/stats ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get products
curl http://localhost:5000/api/admin/products ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Get customers
curl http://localhost:5000/api/admin/customers ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📋 Admin API Endpoints Summary:

### Dashboard
```
GET /api/admin/dashboard/stats
Response: {
  totalSales: 15000,
  ordersToday: 5,
  lowStockItems: ["Product 1", "Product 2"],
  activeCustomers: 25,
  topSellingProducts: [...],
  recentOrders: [...]
}
```

### Products
```
GET    /api/admin/products           - List all
GET    /api/admin/products/:id       - Get one
POST   /api/admin/products           - Create
PUT    /api/admin/products/:id       - Update
DELETE /api/admin/products/:id       - Delete
```

### Customers
```
GET   /api/admin/customers           - List all
GET   /api/admin/customers/:id       - Get one
PATCH /api/admin/customers/:id/status - Update status
```

### Orders
```
GET   /api/admin/orders              - List all
GET   /api/admin/orders/:id          - Get one with items
PATCH /api/admin/orders/:id/status   - Update status
```

### Inventory
```
GET   /api/admin/inventory           - List all
PATCH /api/admin/inventory/:id/stock - Update stock
```

### Reports
```
GET /api/admin/reports/sales         - Sales report
```

---

## 🔐 Security:

All admin routes are protected:
- ✅ Requires JWT token
- ✅ Requires admin role
- ✅ Token verification
- ✅ Role-based access control

Middleware chain:
```javascript
verifyToken → verifyAdmin → route handler
```

---

## 💡 How to Update Admin Components:

### Example: AdminDashboard.jsx

```javascript
import { adminAPI } from '../services/api';
import { useEffect, useState } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Total Sales: ₱{stats.totalSales}</h2>
      <h2>Orders Today: {stats.ordersToday}</h2>
      {/* ... */}
    </div>
  );
}
```

### Example: AdminProducts.jsx

```javascript
import { adminAPI } from '../services/api';

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await adminAPI.getProducts();
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminAPI.deleteProduct(id);
      loadProducts(); // Reload list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreate = async (data) => {
    try {
      await adminAPI.createProduct(data);
      loadProducts(); // Reload list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ... render products
}
```

---

## 🧪 Testing Checklist:

- [ ] Insert sample data (`npm run sample-data`)
- [ ] Backend server running
- [ ] Login as admin
- [ ] Test dashboard stats endpoint
- [ ] Test products CRUD
- [ ] Test customers list
- [ ] Test orders list
- [ ] Test inventory
- [ ] Test reports

---

## 📊 Database Schema:

### Products Table
```sql
- id (PK)
- name
- description
- category
- price
- stock
- image
- created_at
- updated_at
```

### Users Table (Customers)
```sql
- id (PK)
- firstname
- lastname
- email
- password_hash
- contact_number
- address
- role (customer/admin)
- is_active
- created_at
- updated_at
```

### Orders Table
```sql
- id (PK)
- user_id (FK)
- total_amount
- status (pending/processing/shipped/delivered/cancelled)
- shipping_address
- created_at
- updated_at
```

### Order Items Table
```sql
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity
- price
- created_at
- updated_at
```

---

## 🎯 Next Steps:

### 1. Update Admin Components

Update each admin component to use the API:

- `AdminDashboard.jsx` - Use `getDashboardStats()`
- `AdminProducts.jsx` - Use products CRUD methods
- `AdminCustomers.jsx` - Use customers methods
- `AdminOrders.jsx` - Use orders methods
- `AdminInventory.jsx` - Use inventory methods
- `AdminReports.jsx` - Use `getSalesReport()`

### 2. Add Loading States

```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Show loading spinner
if (loading) return <div>Loading...</div>;

// Show error message
if (error) return <div>Error: {error}</div>;
```

### 3. Add Error Handling

```javascript
try {
  const response = await adminAPI.getProducts();
  setProducts(response.data.data);
} catch (error) {
  setError(error.response?.data?.message || 'Failed to load');
}
```

---

## 📝 Quick Commands:

```bash
# Insert sample data
cd backend
npm run sample-data

# Start backend
npm run dev

# Test admin login
curl -X POST http://localhost:5000/api/auth/admin/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@misaki.com\",\"password\":\"admin123\"}"

# Test dashboard (with token)
curl http://localhost:5000/api/admin/dashboard/stats ^
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✅ Summary:

**Tapos na:**
- ✅ All admin API endpoints
- ✅ Authentication & authorization
- ✅ Database queries
- ✅ Error handling
- ✅ Sample data script
- ✅ Frontend API service

**Kailangan mo pa:**
- 🔄 Update admin components to use API
- 🔄 Add loading states
- 🔄 Add error handling
- 🔄 Test all features

---

**Backend is ready! Just update the frontend components to use the API!** 🚀
