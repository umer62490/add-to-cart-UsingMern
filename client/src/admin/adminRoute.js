import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.user);

    // Show a loading spinner or placeholder while user data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to unauthorized page if the user is not an admin
    if (!user || user.role !== 'admin') {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AdminRoute;
