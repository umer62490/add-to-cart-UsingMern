const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { 
                    type: Number, 
                    required: true,
                    min: 1,  // Ensure quantity is a positive number
                },
            },
        ],
        totalPrice: { type: Number, default: 0 },  // Optional: Calculate total price for the cart
    },
    { timestamps: true }  // Automatically add createdAt and updatedAt fields
);

cartSchema.pre('save', function (next) {
    // Optionally calculate the total price based on the cart's products
    this.totalPrice = this.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
