const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, 'Name is required'], 
            trim: true, 
        },
        email: { 
            type: String, 
            required: [true, 'Email is required'], 
            unique: true, 
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Please provide a valid email',
            ],
        },
        password: { 
            type: String, 
            required: [true, 'Password is required'], 
            minlength: [6, 'Password must be at least 6 characters'], 
        },
        role: { 
            type: String, 
            enum: ['user', 'admin'], 
            default: 'user', 
        },
    },
    { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if password is not modified
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
