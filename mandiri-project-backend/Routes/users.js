const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users with optional filtering
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        
        let query = {};
        if (status) query.status = status;
        
        const users = await User.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await User.countDocuments(query);

        res.json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total: total
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
});

// POST create new user (Contact Form)
router.post('/', async (req, res) => {
    try {
        const { fullName, email, phoneNumber, companyName, message } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists. Please use a different email address.'
            });
        }

        // Create new user
        const newUser = new User({
            fullName,
            email: email.toLowerCase(),
            phoneNumber,
            companyName,
            message,
            source: 'website'
        });

        // Save to database
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for your message! We will get back to you soon.',
            data: savedUser.getPublicProfile()
        });
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists. Please use a different email address.'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'User fetched successfully',
            data: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
});

// UPDATE user status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'read', 'replied', 'archived'];
        
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Valid status is required',
                validStatuses: validStatuses
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: `User status updated to ${status}`,
            data: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user status',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        });
    }
});

module.exports = router;