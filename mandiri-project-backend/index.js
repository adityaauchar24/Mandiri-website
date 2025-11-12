const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fix mongoose warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mandiri-db';

console.log('🔗 Connecting to MongoDB...');
console.log('MongoDB URI:', MONGODB_URI.replace(/mongodb:\/\/([^:]+):([^@]+)@/, 'mongodb://***:***@'));

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.name);
})
.catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('💡 Please check your MongoDB connection and .env file');
});

// Import routes
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/users', userRoutes);

// Basic routes
app.get('/', (req, res) => {
    res.json({ 
        message: '🚀 PT. International Mandiri Expo Backend API is running!',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            health: '/health',
            test: '/api/test'
        },
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Test route working! Backend is properly configured.',
        timestamp: new Date().toISOString(),
        data: {
            server: 'Express.js',
            database: 'MongoDB',
            status: 'Operational'
        }
    });
});

// Test database connection route
app.get('/api/test-db', async (req, res) => {
    try {
        const User = require('./models/User');
        const userCount = await User.countDocuments();
        res.json({
            success: true,
            message: 'Database connection test successful!',
            userCount: userCount,
            database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database connection test failed',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Error Stack:', err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Route not found',
        path: req.originalUrl,
        availableRoutes: [
            '/',
            '/health', 
            '/api/users', 
            '/api/test',
            '/api/test-db'
        ]
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🎯 Server running on port ${PORT}`);
    console.log(`🏠 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
    console.log(`\n📊 API Endpoints:`);
    console.log(`   🔍 Health Check: http://localhost:${PORT}/health`);
    console.log(`   👥 Users API: http://localhost:${PORT}/api/users`);
    console.log(`   🧪 Test API: http://localhost:${PORT}/api/test`);
    console.log(`   💾 DB Test: http://localhost:${PORT}/api/test-db`);
    console.log(`\n🚀 Server ready!`);
});