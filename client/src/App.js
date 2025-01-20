import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './product/productList';
import Login from './user/userLogin';
import Signup from './user/userSignup';
import AdminRoute from './admin/adminRoute';
import ProductForm from './product/productForm';
import CartView from './cart/cartView';
import PrivateRoute from './privateRoutes/privateRoute';
// import Header from './components/Header';

const App = () => {
    return (
        <Router>
            {/* <Header /> */}
            <main>
                <Routes>
                    {/* Home route */}
                    <Route path="/" element={<ProductList />} />

                    {/* Cart route (protected) */}
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute>
                                <CartView />
                            </PrivateRoute>
                        }
                    />

                    {/* Authentication routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Admin route (protected) */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <div>
                                    <h1>Admin Panel</h1>
                                    <ProductForm />
                                    <ProductList />
                                </div>
                            </AdminRoute>
                        }
                    />

                    {/* 404 fallback */}
                    <Route path="*" element={<h2>Page Not Found</h2>} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
