const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middleware/auth');

// Create new order (requires authentication)
router.post('/create', verifyToken, async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      items,
      shippingAddress,
      contactInfo,
      paymentMethod,
      shippingMethod
    } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    if (!shippingAddress || !contactInfo || !paymentMethod || !shippingMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required information'
      });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const [products] = await connection.query(
        'SELECT price, stock FROM products WHERE id = ?',
        [item.id]
      );

      if (products.length === 0) {
        throw new Error(`Product ${item.id} not found`);
      }

      if (products[0].stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.id}`);
      }

      totalAmount += products[0].price * item.quantity;
    }

    // Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, shipping_method, contact_name, contact_email, contact_phone)
       VALUES (?, ?, 'pending', ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        totalAmount,
        shippingAddress,
        paymentMethod,
        shippingMethod,
        contactInfo.name,
        contactInfo.email,
        contactInfo.phone
      ]
    );

    const orderId = orderResult.insertId;

    // Create order items and update stock
    for (const item of items) {
      const [products] = await connection.query(
        'SELECT price FROM products WHERE id = ?',
        [item.id]
      );

      // Insert order item
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.id, item.quantity, products[0].price]
      );

      // Update product stock
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.id]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId,
        totalAmount,
        status: 'pending'
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  } finally {
    connection.release();
  }
});

// Get user orders (requires authentication)
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT 
        id,
        total_amount,
        status,
        payment_method,
        shipping_method,
        shipping_address,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') as order_date
       FROM orders
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

// Get single order details (requires authentication)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT 
        o.*,
        DATE_FORMAT(o.created_at, '%Y-%m-%d %H:%i') as order_date
       FROM orders o
       WHERE o.id = ? AND o.user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Get order items
    const [items] = await db.query(
      `SELECT 
        oi.quantity,
        oi.price,
        p.name,
        p.image
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [req.params.id]
    );

    res.json({
      success: true,
      data: {
        ...orders[0],
        items
      }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// Create order for guest (no authentication)
router.post('/guest/create', async (req, res) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      items,
      shippingAddress,
      contactInfo,
      paymentMethod,
      shippingMethod
    } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    if (!shippingAddress || !contactInfo || !paymentMethod || !shippingMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required information'
      });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of items) {
      const [products] = await connection.query(
        'SELECT price, stock FROM products WHERE id = ?',
        [item.id]
      );

      if (products.length === 0) {
        throw new Error(`Product ${item.id} not found`);
      }

      if (products[0].stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.id}`);
      }

      totalAmount += products[0].price * item.quantity;
    }

    // Create guest order (user_id = NULL for guests)
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total_amount, status, shipping_address, payment_method, shipping_method, contact_name, contact_email, contact_phone, is_guest)
       VALUES (NULL, ?, 'pending', ?, ?, ?, ?, ?, ?, TRUE)`,
      [
        totalAmount,
        shippingAddress,
        paymentMethod,
        shippingMethod,
        contactInfo.name,
        contactInfo.email,
        contactInfo.phone
      ]
    );

    const orderId = orderResult.insertId;

    // Create order items and update stock
    for (const item of items) {
      const [products] = await connection.query(
        'SELECT price FROM products WHERE id = ?',
        [item.id]
      );

      await connection.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.id, item.quantity, products[0].price]
      );

      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.id]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId,
        totalAmount,
        status: 'pending',
        trackingEmail: contactInfo.email
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Create guest order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  } finally {
    connection.release();
  }
});

module.exports = router;
