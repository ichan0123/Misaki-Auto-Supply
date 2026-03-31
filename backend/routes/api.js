const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Example route to get all products
router.get('/products', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Example route to create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    res.status(201).json({ id: result.insertId, name, description, price, stock });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
});

module.exports = router;
