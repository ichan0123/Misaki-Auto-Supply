const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdmin() {
  let connection;
  
  try {
    console.log('\n🔐 Creating Admin User...\n');

    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'misaki_auto_supply'
    });

    console.log('✅ Connected to database');

    // Check if admin exists
    const [admins] = await connection.query(
      'SELECT id FROM admin_users WHERE email = ?',
      ['admin@misaki.com']
    );

    if (admins.length > 0) {
      console.log('ℹ️  Admin user already exists');
      console.log('   📧 Email: admin@misaki.com');
      console.log('   🔑 Password: admin123');
      return;
    }

    // Create admin user
    const adminPassword = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await connection.query(
      'INSERT INTO admin_users (email, password_hash, full_name) VALUES (?, ?, ?)',
      ['admin@misaki.com', passwordHash, 'System Administrator']
    );

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('   📧 Email: admin@misaki.com');
    console.log('   🔑 Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password in production!\n');

  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.log('\n💡 Tip: Run the database setup first:');
      console.log('   mysql -u root -p misaki_auto_supply < database/setup.sql\n');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run
createAdmin();
