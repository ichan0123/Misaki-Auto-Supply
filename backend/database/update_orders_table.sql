-- Update Orders Table for Payment & Shipping
-- Run this to add payment and shipping fields

USE misaki_auto_supply;

-- Drop existing tables (careful - this deletes data!)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;

-- Create new orders table with payment fields
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  payment_method ENUM('cod', 'gcash', 'bank_transfer') DEFAULT 'cod',
  shipping_method ENUM('misaki', 'lalamove', 'jnt', 'lbc') DEFAULT 'misaki',
  contact_name VARCHAR(200),
  contact_email VARCHAR(100),
  contact_phone VARCHAR(20),
  is_guest BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
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
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Verify tables
SHOW TABLES;

SELECT 'Orders table updated successfully!' as status;
