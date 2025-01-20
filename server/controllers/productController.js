const Product = require('../models/product');

// Add Product
exports.addProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    // Input Validation
    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: 'All fields are required (name, description, price, category)' });
    }

    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    // Input Validation
    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: 'All fields are required (name, description, price, category)' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};
