import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        imageUrl: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic Validation
        if (!formData.name || formData.price <= 0 || formData.stock < 0) {
            setError('Please fill out all required fields with valid values.');
            return;
        }

        try {
            await axios.post('/api/products', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setSuccess('Product added successfully');
            setFormData({
                name: '',
                price: '',
                description: '',
                category: '',
                stock: '',
                imageUrl: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
