const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route for filtering products
router.get('/products/filter', async (req, res) => {
  try {
    const { category, subcategory, priceMin, priceMax, location } = req.query;

    const filters = {};

    if (category) {
      filters.category = category;
    }

    if (subcategory) {
      filters.subcategory = subcategory;
    }

    if (priceMin && priceMax) {
      filters.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin) {
      filters.price = { $gte: priceMin };
    } else if (priceMax) {
      filters.price = { $lte: priceMax };
    }

    if (location) {
      filters.location = location;
    }

    const products = await Product.find(filters).populate('category').populate('subcategory');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
