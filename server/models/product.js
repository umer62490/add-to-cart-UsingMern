const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { 
            type: Number, 
            required: true, 
            min: 0, // Ensure the price is a positive number
        },
        description: { type: String, required: true },
        category: { type: String, required: true },
        stock: { 
            type: Number, 
            required: true,
            min: 0,  // Ensure stock cannot be negative
            default: 0,  // Default to 0 if not specified
        },
        imageUrl: { 
            type: String, 
            required: true,
            match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i,  // Optional: basic image URL validation
        },
    },
    { timestamps: true } // Add createdAt and updatedAt fields automatically
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
