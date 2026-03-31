# 📝 Manual Database Setup Guide

Kung may error ang automatic setup, sundin ang manual steps:

## Step 1: Create Database

Open MySQL command line or MySQL Workbench:

```sql
CREATE DATABASE misaki_auto_supply;
USE misaki_auto_supply;
```

## Step 2: Create Tables

Copy and paste ang SQL commands from `database/setup.sql` or run:

```bash
mysql -u root -p misaki_auto_supply < database/setup.sql
```

**Or manually create tables:**

```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20),
  address TEXT,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Step 3: Create Admin User

Run the admin creation script:

```bash
npm run create-admin
```

This will create:
- Email: `admin@misaki.com`
- Password: `admin123`

## Step 4: Verify Setup

Check if tables were created:

```sql
USE misaki_auto_supply;
SHOW TABLES;
```

You should see:
- admin_users
- users
- products
- orders
- order_items

Check admin user:

```sql
SELECT id, email, full_name FROM admin_users;
```

## Step 5: Test the API

Server should be running on `http://localhost:5000`

Test admin login:

```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@misaki.com\",\"password\":\"admin123\"}"
```

## ✅ Done!

Kung successful, you should see:

```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@misaki.com",
      "fullName": "System Administrator",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 🆘 Troubleshooting

**Error: "Database does not exist"**
- Run: `CREATE DATABASE misaki_auto_supply;`

**Error: "Table already exists"**
- Tables are already created, skip to Step 3

**Error: "Access denied"**
- Check your MySQL username/password in `.env`
- Make sure MySQL is running

**Error: "Cannot connect to MySQL"**
- Start MySQL service
- Check if port 3306 is open

## 📝 Quick Commands

```bash
# Create admin user
npm run create-admin

# Start server
npm run dev

# Test database connection
curl http://localhost:5000/api/test-db
```

---

**Note:** Ang server ay running na kahit walang database setup. Pero kailangan ng database para gumana ang authentication.
