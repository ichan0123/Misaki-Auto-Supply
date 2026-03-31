const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all products (public - no auth required)
router.get('/', async (req, res) => {
  try {
    const { category, search, limit } = req.query;
    
    let query = 'SELECT id, name, description, category, price, stock, image FROM products WHERE stock > 0';
    const params = [];

    // Filter by category
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    // Search by name
    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    // Order by newest first
    query += ' ORDER BY created_at DESC';

    // Limit results
    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const [products] = await db.query(query, params);

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

// Get single product (public)
router.get('/:id', async (req, res) => {
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

// Get featured products (public)
router.get('/featured/list', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT id, name, description, category, price, stock, image
      FROM products
      WHERE stock > 0
      ORDER BY created_at DESC
      LIMIT 6
    `);

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured products',
      error: error.message
    });
  }
});

// Get products by category (public)
router.get('/category/:category', async (req, res) => {
  try {
    const [products] = await db.query(
      'SELECT id, name, description, category, price, stock, image FROM products WHERE category = ? AND stock > 0 ORDER BY created_at DESC',
      [req.params.category]
    );

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// Get all categories (public)
router.get('/categories/list', async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT DISTINCT category, COUNT(*) as count
      FROM products
      WHERE category IS NOT NULL AND stock > 0
      GROUP BY category
      ORDER BY category ASC
    `);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

module.exports = router;
