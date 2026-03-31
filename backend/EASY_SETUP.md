# 🚀 Easy Database Setup - Step by Step

## Problem: phpMyAdmin not working?

No problem! Gawin natin using command line.

---

## Step 1: Start MySQL Service

### If using XAMPP:
1. Open **XAMPP Control Panel**
2. Click **Start** sa MySQL
3. Wait until status is "Running"

### If using WAMP:
1. Open **WAMP**
2. Make sure icon is GREEN
3. If not, click "Start All Services"

---

## Step 2: Open MySQL Command Line

### Option A: XAMPP MySQL Shell
1. Open XAMPP Control Panel
2. Click **Shell** button
3. Type: `mysql -u root -p`
4. Press Enter (no password, just press Enter again)

### Option B: Windows Command Prompt
```bash
# Go to MySQL bin folder (adjust path if different)
cd C:\xampp\mysql\bin

# Or for WAMP
cd C:\wamp64\bin\mysql\mysql8.0.x\bin

# Login to MySQL
mysql -u root -p
```

Press Enter when asked for password (default is blank)

---

## Step 3: Create Database

Copy and paste these commands one by one:

```sql
-- Create database
CREATE DATABASE misaki_auto_supply;

-- Use the database
USE misaki_auto_supply;

-- Create users table
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

-- Create admin_users table
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

-- Create products table
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

-- Create orders table
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

-- Create order_items table
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

-- Verify tables were created
SHOW TABLES;

-- Exit MySQL
EXIT;
```

---

## Step 4: Create Admin User

Now go back to your project folder and run:

```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
npm run create-admin
```

You should see:
```
✅ Admin user created successfully!

📋 Admin Credentials:
   📧 Email: admin@misaki.com
   🔑 Password: admin123
```

---

## Step 5: Test the Backend

```bash
# Make sure server is running
npm run dev

# In another terminal, test admin login
curl -X POST http://localhost:5000/api/auth/admin/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@misaki.com\",\"password\":\"admin123\"}"
```

---

## ✅ Verification Checklist

- [ ] MySQL service is running (XAMPP/WAMP)
- [ ] Database `misaki_auto_supply` created
- [ ] All 5 tables created (users, admin_users, products, orders, order_items)
- [ ] Admin user created
- [ ] Backend server running on port 5000
- [ ] Admin login test successful

---

## 🆘 Still Having Issues?

### MySQL won't start?
- Check if port 3306 is already in use
- Try restarting XAMPP/WAMP
- Check MySQL error logs

### Can't connect to MySQL?
- Verify MySQL is running
- Check username/password in `.env`
- Default is: user=root, password=(blank)

### Tables not creating?
- Make sure you're in the correct database: `USE misaki_auto_supply;`
- Copy commands one by one, not all at once
- Check for error messages

### Admin user not creating?
- Make sure you're in the `backend` folder
- Run: `cd backend` first
- Then: `npm run create-admin`

---

## 📝 Quick Commands Reference

```bash
# Start MySQL (XAMPP)
C:\xampp\mysql\bin\mysql -u root -p

# Create database
CREATE DATABASE misaki_auto_supply;

# Use database
USE misaki_auto_supply;

# Show tables
SHOW TABLES;

# Show admin user
SELECT * FROM admin_users;

# Exit MySQL
EXIT;

# Create admin (from backend folder)
cd backend
npm run create-admin

# Start server
npm run dev
```

---

## 🎯 After Setup

Once everything is working:

1. ✅ Backend server running
2. ✅ Database created
3. ✅ Admin user created
4. ✅ Can login as admin

**Next:** Connect frontend to backend API!

---

**Need more help?** Check `MANUAL_SETUP.md` for detailed troubleshooting.
