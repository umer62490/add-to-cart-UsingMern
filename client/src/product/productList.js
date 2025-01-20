import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productSlice';
import { addToCart } from '../cart/cartSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { items: cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (productId) => {
        if (!user) {
            alert('Please log in to add products to the cart.');
            return;
        }

        const alreadyInCart = cartItems.find((item) => item.productId === productId);
        if (alreadyInCart) {
            alert('This product is already in your cart.');
            return;
        }

        dispatch(addToCart({ userId: user.id, productId, quantity: 1 }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Product List</h2>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            <strong>{product.name}</strong> - ${product.price}
                            <p>{product.description}</p>
                            <button onClick={() => handleAddToCart(product._id)}>
                                Add to Cart
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
