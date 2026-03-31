-- Misaki Auto Supply Database Setup
-- Run this file manually if npm run setup fails

-- Create database
CREATE DATABASE IF NOT EXISTS misaki_auto_supply;
USE misaki_auto_supply;

-- Users table (for customers)
CREATE TABLE IF NOT EXISTS users (
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

-- Admin users table (separate for security)
CREATE TABLE IF NOT EXISTS admin_users (
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
CREATE TABLE IF NOT EXISTS products (
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
CREATE TABLE IF NOT EXISTS orders (
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
CREATE TABLE IF NOT EXISTS order_items (
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

-- Insert default admin user
-- Email: admin@misaki.com
-- Password: admin123
-- Note: This is a pre-hashed password using bcrypt
INSERT INTO admin_users (email, password_hash, full_name) 
SELECT 'admin@misaki.com', '$2a$10$YourHashWillBeHere', 'System Administrator'
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE email = 'admin@misaki.com');

-- Insert sample products
INSERT INTO products (name, description, category, price, stock, image) 
SELECT * FROM (
  SELECT 'Vortex Exhaust Bent Pipe' as name, 'High performance exhaust pipe' as description, 'Exhaust' as category, 680.00 as price, 24 as stock, '/images/products/vortex-exhaust.jpg' as image
  UNION ALL
  SELECT 'MagnaFlow Performance Exhaust', 'Premium exhaust system', 'Exhaust', 700.00, 18, '/images/products/magnaflow-exhaust.jpg'
  UNION ALL
  SELECT 'Sport Brake Pads', 'High quality brake pads', 'Brakes', 320.00, 5, '/images/products/brake-pads.jpg'
  UNION ALL
  SELECT 'Engine Oil 5W-30', 'Synthetic engine oil', 'Engine', 45.99, 100, '/images/products/engine-oil.jpg'
  UNION ALL
  SELECT 'Air Filter', 'High flow air filter', 'Engine', 24.99, 150, '/images/products/air-filter.jpg'
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);

-- Show tables
SHOW TABLES;

-- Show admin user (without password)
SELECT id, email, full_name, is_active, created_at FROM admin_users;

-- Show products count
SELECT COUNT(*) as total_products FROM products;

SELECT '✅ Database setup complete!' as status;
