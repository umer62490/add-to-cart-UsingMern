import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunks
export const addToCart = createAsyncThunk('cart/addToCart', async (cartData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('/api/cart', cartData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`/api/cart/${productId}`, { userId, quantity });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ userId, productId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/cart/${productId}`, { data: { userId } });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Cart Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.items = action.payload.products;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })

            // Delete Cart Item
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearError, clearSuccess } = cartSlice.actions;

export default cartSlice.reducer;
