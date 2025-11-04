const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create User - Modified to match your frontend exactly
router.post("/", async (req, res) => {
    try {
        // Add CORS headers to match frontend
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');

        const { fullName, email, phoneNumber, companyName, message } = req.body;

        console.log('Received data:', { fullName, email, phoneNumber, companyName, message });

        // Check if all required fields are present
        if (!fullName || !email || !phoneNumber || !companyName || !message) {
            return res.status(400).json({ 
                _message: 'Please fill all fields, every field is required' 
            });
        }

        // Create and save user
        const newUser = new User({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,   
            companyName: companyName,   
            message: message,   
        });

        const savedUser = await newUser.save();
        console.log('User saved successfully:', savedUser._id);
        
        // Return success response matching your frontend expectation exactly
        res.status(200).json({ 
            _message: 'successfully submitted'
        });

    } catch(err) {
        console.error('Error creating user:', err);
        res.status(400).json({ 
            _message: 'Failed to submit form'
        });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch(err) {
        res.status(400).json({ 
            _message: 'Failed to fetch users'
        });
    }
});

// Handle OPTIONS preflight requests
router.options("/", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Origin');
    res.sendStatus(200);
});

module.exports = router;