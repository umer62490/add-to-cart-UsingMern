const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/uuserMiddleware');
const router = express.Router();

// Fetch all products (authentication required)
router.get('/', protect, getProducts);

// Admin routes: Protect and only admins can create, update, or delete products
router.post('/', protect, admin, addProduct);  // Admin only: Create product
router.put('/:productId', protect, admin, updateProduct);  // Admin only: Update product by productId
router.delete('/:productId', protect, admin, deleteProduct);  // Admin only: Delete product by productId

module.exports = router;
