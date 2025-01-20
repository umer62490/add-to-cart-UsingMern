const Cart = require('../models/cart');

// Add to Cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Input Validation
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'All fields are required (userId, productId, quantity)' });
    }

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    try {
        let cart = await Cart.findOne({ userId });
        
        // Create a new cart if one does not exist
        if (!cart) cart = new Cart({ userId, products: [] });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        
        // If product exists, update its quantity
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            // If product does not exist, add it to the cart
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Update Cart Item
exports.updateCartItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Input Validation
    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ message: 'All fields are required (userId, productId, quantity)' });
    }

    if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex > -1) {
            // If quantity is 0 or less, remove the product from the cart
            if (quantity === 0) {
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity = quantity;
            }
            await cart.save();
            res.status(200).json({ message: 'Cart updated successfully', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Delete Cart Item
exports.deleteCartItem = async (req, res) => {
    const { userId, productId } = req.body;

    // Input Validation
    if (!userId || !productId) {
        return res.status(400).json({ message: 'Both userId and productId are required' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const updatedProducts = cart.products.filter(
            (p) => p.productId.toString() !== productId
        );

        // If no product was removed, send a message saying so
        if (updatedProducts.length === cart.products.length) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products = updatedProducts;
        await cart.save();

        res.status(200).json({ message: 'Product removed from cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Additional Feature: View Cart
exports.viewCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};
