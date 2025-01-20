import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, deleteCartItem } from './cartSlice';
import { useNavigate } from 'react-router-dom';

const CartView = () => {
    const { items, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateQuantity = (productId, quantity) => {
        if (user) {
            dispatch(updateCartItem({ userId: user.id, productId, quantity }));
        } else {
            alert('Please log in to update your cart.');
        }
    };

    const handleDeleteItem = (productId) => {
        if (user) {
            dispatch(deleteCartItem({ userId: user.id, productId }));
        } else {
            alert('Please log in to update your cart.');
        }
    };

    if (loading) return <p>Loading Cart...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <button onClick={() => navigate('/')}>Go to Products</button>
                </div>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.productId}>
                            <div>
                                <p>
                                    <strong>Product:</strong> {item.productName || 'Unknown'}
                                </p>
                                <p>
                                    <strong>Quantity:</strong> {item.quantity}
                                </p>
                            </div>
                            <div>
                                <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
                                    +
                                </button>
                                <button
                                    onClick={() =>
                                        handleUpdateQuantity(item.productId, Math.max(item.quantity - 1, 1))
                                    }
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <button onClick={() => handleDeleteItem(item.productId)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CartView;
