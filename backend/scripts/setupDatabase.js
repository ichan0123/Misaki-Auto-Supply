const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    console.log('\n🔧 Setting up Misaki Auto Supply Database...\n');

    // Connect to MySQL (without database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('✅ Connected to MySQL server');

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'misaki_auto_supply'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'misaki_auto_supply'}' created/verified`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'misaki_auto_supply'}`);

    // Create users table
    await connection.query(`
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
      )
    `);
    console.log('✅ Users table created');

    // Create admin_users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(200) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Admin users table created');

    // Create products table
    await connection.query(`
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
      )
    `);
    console.log('✅ Products table created');

    // Create orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        shipping_address TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    console.log('✅ Orders table created');

    // Create order_items table
    await connection.query(`
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
      )
    `);
    console.log('✅ Order items table created');

    // Check if admin exists
    const [admins] = await connection.query('SELECT id FROM admin_users WHERE email = ?', ['admin@misaki.com']);

    if (admins.length === 0) {
      // Create default admin user
      const adminPassword = 'admin123';
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);

      await connection.query(
        'INSERT INTO admin_users (email, password_hash, full_name) VALUES (?, ?, ?)',
        ['admin@misaki.com', passwordHash, 'System Administrator']
      );
      console.log('✅ Default admin user created');
      console.log('   📧 Email: admin@misaki.com');
      console.log('   🔑 Password: admin123');
      console.log('   ⚠️  Please change this password in production!');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Insert sample products if table is empty
    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    
    if (products[0].count === 0) {
      await connection.query(`
        INSERT INTO products (name, description, category, price, stock, image) VALUES
        ('Vortex Exhaust Bent Pipe', 'High performance exhaust pipe', 'Exhaust', 680.00, 24, '/images/products/vortex-exhaust.jpg'),
        ('MagnaFlow Performance Exhaust', 'Premium exhaust system', 'Exhaust', 700.00, 18, '/images/products/magnaflow-exhaust.jpg'),
        ('Sport Brake Pads', 'High quality brake pads', 'Brakes', 320.00, 5, '/images/products/brake-pads.jpg'),
        ('Engine Oil 5W-30', 'Synthetic engine oil', 'Engine', 45.99, 100, '/images/products/engine-oil.jpg'),
        ('Air Filter', 'High flow air filter', 'Engine', 24.99, 150, '/images/products/air-filter.jpg')
      `);
      console.log('✅ Sample products inserted');
    }

    console.log('\n✨ Database setup completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run setup
setupDatabase();
