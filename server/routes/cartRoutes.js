const express = require('express');
const { body, param } = require('express-validator');
const { addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const protect = require('../middleware/userMiddleware'); // Protection middleware
const router = express.Router();

// Validation middleware
const validateCartItem = [
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const validateProductId = [
    param('productId').isMongoId().withMessage('Invalid product ID'),
];

// Routes with protection and validation
router.post('/', protect, validateCartItem, addToCart); // Add to cart
router.put('/:productId', protect, validateProductId, updateCartItem); // Update cart item
router.delete('/:productId', protect, validateProductId, deleteCartItem); // Delete cart item

module.exports = router;
