const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Verify Token Middleware with User Query
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, token missing or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

        // Fetch the user from the database
        const user = await User.findById(decoded.id).select('-password'); // Exclude the password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user data to req.user
        next(); // Proceed to the next middleware/route
    } catch (error) {
        console.error('Token verification failed:', error.message); // Log for debugging
        const message =
            error.name === 'TokenExpiredError' ? 'Token expired' : 'Not authorized, token invalid';
        res.status(401).json({ message });
    }
};

// Admin Middleware
const admin = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'No user data found. Ensure protect middleware is applied.' });
    }

    if (req.user.role === 'admin') {
        next(); // Allow access if the user is an admin
    } else {
        res.status(403).json({ message: 'You do not have admin rights' }); // Deny access for non-admin users
    }
};

module.exports = { protect, admin };
