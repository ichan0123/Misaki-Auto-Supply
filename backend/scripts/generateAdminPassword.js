const bcrypt = require('bcryptjs');

// Generate password hash for admin
async function generateAdminPassword() {
  const password = 'admin123'; // Default admin password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  console.log('\n===========================================');
  console.log('Admin Password Hash Generator');
  console.log('===========================================\n');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUse this hash in your schema.sql file for the admin user.');
  console.log('\n===========================================\n');
}

generateAdminPassword();
