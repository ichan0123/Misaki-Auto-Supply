const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// All admin routes require authentication
router.use(verifyToken);
router.use(verifyAdmin);

// ==================== DASHBOARD ====================

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Total sales this month
    const [salesResult] = await db.query(`
      SELECT COALESCE(SUM(total_amount), 0) as totalSales
      FROM orders
      WHERE MONTH(created_at) = MONTH(CURRENT_DATE())
      AND YEAR(created_at) = YEAR(CURRENT_DATE())
    `);

    // Orders today
    const [ordersToday] = await db.query(`
      SELECT COUNT(*) as count
      FROM orders
      WHERE DATE(created_at) = CURDATE()
    `);

    // Low stock items
    const [lowStockItems] = await db.query(`
      SELECT name, stock
      FROM products
      WHERE stock <= 10
      ORDER BY stock ASC
      LIMIT 5
    `);

    // Active customers
    const [activeCustomers] = await db.query(`
      SELECT COUNT(*) as count
      FROM users
      WHERE is_active = TRUE
    `);

    // Top selling products
    const [topProducts] = await db.query(`
      SELECT p.id, p.name, COALESCE(SUM(oi.quantity), 0) as sales
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id, p.name
      ORDER BY sales DESC
      LIMIT 4
    `);

    // Recent orders
    const [recentOrders] = await db.query(`
      SELECT o.id, CONCAT(u.firstname, ' ', u.lastname) as customer, 
             o.total_amount as total, DATE_FORMAT(o.created_at, '%m/%d/%y') as date,
             o.status
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 4
    `);

    res.json({
      success: true,
      data: {
        totalSales: parseFloat(salesResult[0].totalSales),
        ordersToday: ordersToday[0].count,
        lowStockItems: lowStockItems.map(item => item.name),
        activeCustomers: activeCustomers[0].count,
        topSellingProducts: topProducts,
        recentOrders: recentOrders
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
});

// ==================== PRODUCTS ====================

// Get all products
router.get('/products', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT id, name, category, price, stock, image, created_at
      FROM products
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const [products] = await db.query(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: products[0]
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// Create product
router.post('/products', async (req, res) => {
  try {
    const { name, description, category, price, stock, image } = req.body;

    // Validation
    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and stock are required'
      });
    }

    const [result] = await db.query(
      `INSERT INTO products (name, description, category, price, stock, image)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description || null, category || null, price, stock, image || null]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        id: result.insertId,
        name,
        category,
        price,
        stock,
        image
      }
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const { name, description, category, price, stock, image } = req.body;

    const [result] = await db.query(
      `UPDATE products 
       SET name = ?, description = ?, category = ?, price = ?, stock = ?, image = ?
       WHERE id = ?`,
      [name, description, category, price, stock, image, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

// ==================== CUSTOMERS ====================

// Get all customers
router.get('/customers', async (req, res) => {
  try {
    const [customers] = await db.query(`
      SELECT 
        u.id,
        u.firstname,
        u.lastname,
        u.email,
        u.contact_number as phone,
        u.address,
        DATE_FORMAT(u.created_at, '%Y-%m-%d') as joinDate,
        COUNT(DISTINCT o.id) as orders,
        COALESCE(SUM(o.total_amount), 0) as totalSpent,
        u.is_active as status,
        MAX(o.created_at) as lastOrder
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      WHERE u.role = 'customer'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    // Format data
    const formattedCustomers = customers.map(customer => ({
      id: customer.id,
      name: `${customer.firstname} ${customer.lastname}`,
      email: customer.email,
      phone: customer.phone,
      joinDate: customer.joinDate,
      orders: customer.orders,
      totalSpent: parseFloat(customer.totalSpent),
      status: customer.status ? 'active' : 'inactive',
      lastOrder: customer.lastOrder ? customer.lastOrder.toISOString().split('T')[0] : null
    }));

    res.json({
      success: true,
      data: formattedCustomers
    });

  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: error.message
    });
  }
});

// Get single customer
router.get('/customers/:id', async (req, res) => {
  try {
    const [customers] = await db.query(`
      SELECT 
        u.id,
        u.firstname,
        u.lastname,
        u.email,
        u.contact_number as phone,
        u.address,
        DATE_FORMAT(u.created_at, '%Y-%m-%d') as joinDate,
        COUNT(DISTINCT o.id) as orders,
        COALESCE(SUM(o.total_amount), 0) as totalSpent,
        u.is_active as status,
        MAX(o.created_at) as lastOrder
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      WHERE u.id = ? AND u.role = 'customer'
      GROUP BY u.id
    `, [req.params.id]);

    if (customers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const customer = customers[0];
    res.json({
      success: true,
      data: {
        id: customer.id,
        name: `${customer.firstname} ${customer.lastname}`,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        joinDate: customer.joinDate,
        orders: customer.orders,
        totalSpent: parseFloat(customer.totalSpent),
        status: customer.status ? 'active' : 'inactive',
        lastOrder: customer.lastOrder ? customer.lastOrder.toISOString().split('T')[0] : null
      }
    });

  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer',
      error: error.message
    });
  }
});

// Update customer status
router.patch('/customers/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const isActive = status === 'active';

    const [result] = await db.query(
      'UPDATE users SET is_active = ? WHERE id = ? AND role = "customer"',
      [isActive, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      message: 'Customer status updated successfully'
    });

  } catch (error) {
    console.error('Update customer status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer status',
      error: error.message
    });
  }
});

// ==================== ORDERS ====================

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT 
        o.id,
        CONCAT(u.firstname, ' ', u.lastname) as customer,
        DATE_FORMAT(o.created_at, '%Y-%m-%d') as date,
        o.total_amount as total,
        o.status
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    res.json({
      success: true,
      data: orders.map(order => ({
        ...order,
        total: parseFloat(order.total)
      }))
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

// Get single order with items
router.get('/orders/:id', async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT 
        o.id,
        CONCAT(u.firstname, ' ', u.lastname) as customer,
        DATE_FORMAT(o.created_at, '%Y-%m-%d') as date,
        o.total_amount as total,
        o.status,
        o.shipping_address
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `, [req.params.id]);

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Get order items
    const [items] = await db.query(`
      SELECT 
        p.name,
        oi.quantity,
        oi.price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [req.params.id]);

    const order = orders[0];
    res.json({
      success: true,
      data: {
        ...order,
        total: parseFloat(order.total),
        items: items.map(item => ({
          ...item,
          price: parseFloat(item.price)
        }))
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

// Update order status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const [result] = await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully'
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// ==================== INVENTORY ====================

// Get inventory
router.get('/inventory', async (req, res) => {
  try {
    const [inventory] = await db.query(`
      SELECT 
        id,
        name,
        category,
        CONCAT('SKU-', LPAD(id, 5, '0')) as sku,
        stock as currentStock,
        5 as minStock,
        50 as maxStock,
        price as unitPrice,
        'Auto Parts Direct' as supplier,
        DATE_FORMAT(updated_at, '%Y-%m-%d') as lastRestocked,
        CASE 
          WHEN stock = 0 THEN 'out-of-stock'
          WHEN stock <= 5 THEN 'low-stock'
          ELSE 'in-stock'
        END as status
      FROM products
      ORDER BY name ASC
    `);

    res.json({
      success: true,
      data: inventory.map(item => ({
        ...item,
        unitPrice: parseFloat(item.unitPrice)
      }))
    });

  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory',
      error: error.message
    });
  }
});

// Update inventory stock
router.patch('/inventory/:id/stock', async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid stock quantity is required'
      });
    }

    const [result] = await db.query(
      'UPDATE products SET stock = ? WHERE id = ?',
      [stock, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Stock updated successfully'
    });

  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update stock',
      error: error.message
    });
  }
});

// ==================== REPORTS ====================

// Get sales report
router.get('/reports/sales', async (req, res) => {
  try {
    // Daily sales for last 7 days
    const [dailySales] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %d') as date,
        COALESCE(SUM(total_amount), 0) as amount
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY created_at ASC
    `);

    // Category sales
    const [categorySales] = await db.query(`
      SELECT 
        p.category,
        COALESCE(SUM(oi.quantity * oi.price), 0) as amount
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      WHERE p.category IS NOT NULL
      GROUP BY p.category
      ORDER BY amount DESC
    `);

    res.json({
      success: true,
      data: {
        dailySales: dailySales.map(d => ({
          date: d.date,
          amount: parseFloat(d.amount)
        })),
        categorySales: categorySales.map(c => ({
          category: c.category,
          amount: parseFloat(c.amount)
        }))
      }
    });

  } catch (error) {
    console.error('Get sales report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales report',
      error: error.message
    });
  }
});

module.exports = router;
