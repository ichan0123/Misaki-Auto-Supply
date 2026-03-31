const mysql = require('mysql2/promise');
require('dotenv').config();

async function insertSampleData() {
  let connection;
  
  try {
    console.log('\n📦 Inserting Sample Data...\n');

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'misaki_auto_supply'
    });

    console.log('✅ Connected to database');

    // Check if products already exist
    const [existingProducts] = await connection.query('SELECT COUNT(*) as count FROM products');
    
    if (existingProducts[0].count > 0) {
      console.log('ℹ️  Sample products already exist');
    } else {
      // Insert sample products
      await connection.query(`
        INSERT INTO products (name, description, category, price, stock, image) VALUES
        ('Vortex Exhaust Bent Pipe', 'High performance exhaust pipe for better airflow', 'Exhaust', 680.00, 24, '/images/products/vortex-exhaust.jpg'),
        ('MagnaFlow Performance Exhaust', 'Premium exhaust system with lifetime warranty', 'Exhaust', 700.00, 18, '/images/products/magnaflow-exhaust.jpg'),
        ('Sport Brake Pads', 'High quality ceramic brake pads', 'Brakes', 320.00, 5, '/images/products/brake-pads.jpg'),
        ('Engine Oil 5W-30', 'Synthetic engine oil for optimal performance', 'Engine', 45.99, 100, '/images/products/engine-oil.jpg'),
        ('Air Filter', 'High flow air filter for better engine breathing', 'Engine', 24.99, 150, '/images/products/air-filter.jpg'),
        ('Performance Spark Plugs', 'Iridium spark plugs for better ignition', 'Engine', 89.99, 75, '/images/products/spark-plugs.jpg'),
        ('LED Headlight Bulbs', 'Super bright LED headlight conversion kit', 'Accessories', 129.99, 30, '/images/products/led-headlights.jpg'),
        ('Racing Steering Wheel', 'Sporty steering wheel with leather grip', 'Accessories', 450.00, 12, '/images/products/steering-wheel.jpg'),
        ('Coilover Suspension Kit', 'Adjustable coilover suspension system', 'Suspension', 1200.00, 8, '/images/products/coilover.jpg'),
        ('Performance Radiator', 'Aluminum radiator for better cooling', 'Engine', 380.00, 15, '/images/products/radiator.jpg')
      `);
      console.log('✅ Sample products inserted');
    }

    // Check if test users exist
    const [existingUsers] = await connection.query('SELECT COUNT(*) as count FROM users WHERE role = "customer"');
    
    if (existingUsers[0].count > 0) {
      console.log('ℹ️  Sample users already exist');
    } else {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('password123', salt);

      // Insert sample users
      await connection.query(`
        INSERT INTO users (firstname, lastname, email, password_hash, contact_number, address, role, is_active) VALUES
        ('Juan', 'Dela Cruz', 'juan@example.com', ?, '+63 912 345 6789', '123 Main St, Manila', 'customer', TRUE),
        ('Maria', 'Santos', 'maria@example.com', ?, '+63 923 456 7890', '456 Oak Ave, Quezon City', 'customer', TRUE),
        ('Pedro', 'Reyes', 'pedro@example.com', ?, '+63 934 567 8901', '789 Pine Rd, Makati', 'customer', TRUE)
      `, [passwordHash, passwordHash, passwordHash]);
      console.log('✅ Sample users inserted (password: password123)');
    }

    // Check if orders exist
    const [existingOrders] = await connection.query('SELECT COUNT(*) as count FROM orders');
    
    if (existingOrders[0].count > 0) {
      console.log('ℹ️  Sample orders already exist');
    } else {
      // Get user IDs
      const [users] = await connection.query('SELECT id FROM users WHERE role = "customer" LIMIT 3');
      
      if (users.length > 0) {
        // Insert sample orders
        for (let i = 0; i < users.length; i++) {
          const userId = users[i].id;
          const totalAmount = (Math.random() * 1000 + 500).toFixed(2);
          const statuses = ['pending', 'processing', 'shipped', 'delivered'];
          const status = statuses[Math.floor(Math.random() * statuses.length)];

          const [orderResult] = await connection.query(`
            INSERT INTO orders (user_id, total_amount, status, shipping_address)
            VALUES (?, ?, ?, '123 Sample Address, Manila')
          `, [userId, totalAmount, status]);

          // Insert order items
          const [products] = await connection.query('SELECT id, price FROM products ORDER BY RAND() LIMIT 2');
          
          for (const product of products) {
            const quantity = Math.floor(Math.random() * 3) + 1;
            await connection.query(`
              INSERT INTO order_items (order_id, product_id, quantity, price)
              VALUES (?, ?, ?, ?)
            `, [orderResult.insertId, product.id, quantity, product.price]);
          }
        }
        console.log('✅ Sample orders inserted');
      }
    }

    console.log('\n✨ Sample data insertion completed!\n');
    console.log('📋 Summary:');
    console.log('   - Products: 10 items');
    console.log('   - Users: 3 customers');
    console.log('   - Orders: Sample orders with items');
    console.log('\n🔐 Test User Credentials:');
    console.log('   Email: juan@example.com');
    console.log('   Password: password123\n');

  } catch (error) {
    console.error('\n❌ Error inserting sample data:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run
insertSampleData();
