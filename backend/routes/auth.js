const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Generate JWT Token
const generateToken = (user, isAdmin = false) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: isAdmin ? 'admin' : 'customer'
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// User Signup
router.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password, contactnumber, address } = req.body;

    // Validation
    if (!firstname || !lastname || !email || !password || !contactnumber || !address) {
      return res.status(400).json({ 
        success: false,
        message: 'Please fill in all fields' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await db.query(
      `INSERT INTO users (firstname, lastname, email, password_hash, contact_number, address, role) 
       VALUES (?, ?, ?, ?, ?, ?, 'customer')`,
      [firstname, lastname, email, passwordHash, contactnumber, address]
    );

    // Generate token
    const token = generateToken({ id: result.insertId, email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: result.insertId,
          firstname,
          lastname,
          email,
          role: 'customer'
        },
        token
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during signup',
      error: error.message 
    });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Check if user exists
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          contactNumber: user.contact_number,
          address: user.address,
          role: user.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide email and password' 
      });
    }

    // Check if admin exists
    const [admins] = await db.query(
      'SELECT * FROM admin_users WHERE email = ? AND is_active = TRUE',
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid admin credentials' 
      });
    }

    const admin = admins[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid admin credentials' 
      });
    }

    // Update last login
    await db.query(
      'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
      [admin.id]
    );

    // Generate token
    const token = generateToken(admin, true);

    res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          fullName: admin.full_name,
          role: 'admin'
        },
        token
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during admin login',
      error: error.message 
    });
  }
});

// Verify Token (for checking if user is still logged in)
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user/admin still exists and is active
    if (decoded.role === 'admin') {
      const [admins] = await db.query(
        'SELECT id, email, full_name FROM admin_users WHERE id = ? AND is_active = TRUE',
        [decoded.id]
      );

      if (admins.length === 0) {
        return res.status(401).json({ 
          success: false,
          message: 'Admin not found or inactive' 
        });
      }

      return res.json({
        success: true,
        data: {
          user: {
            id: admins[0].id,
            email: admins[0].email,
            fullName: admins[0].full_name,
            role: 'admin'
          }
        }
      });
    } else {
      const [users] = await db.query(
        'SELECT id, firstname, lastname, email, contact_number, address, role FROM users WHERE id = ? AND is_active = TRUE',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(401).json({ 
          success: false,
          message: 'User not found or inactive' 
        });
      }

      return res.json({
        success: true,
        data: {
          user: {
            id: users[0].id,
            firstname: users[0].firstname,
            lastname: users[0].lastname,
            email: users[0].email,
            contactNumber: users[0].contact_number,
            address: users[0].address,
            role: users[0].role
          }
        }
      });
    }

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token' 
    });
  }
});

// Logout (client-side will remove token, but we can log it)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
