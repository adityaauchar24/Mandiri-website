const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

app.options('*', cors());

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fix mongoose warning
mongoose.set('strictQuery', false);

// MongoDB Connection - USING YOUR MONGODB ATLAS
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aucharsujata_db_user:p35dkta56d3UlxNk@cluster0.ffacq4b.mongodb.net/mandiri-database?retryWrites=true&w=majority';

console.log('🔗 Connecting to MongoDB Atlas...');
console.log('📊 Database: mandiri-database');
console.log('🏠 Environment:', process.env.NODE_ENV || 'development');
console.log('📍 MongoDB URI:', MONGODB_URI.replace(/\/\/[^@]+@/, '//***:***@')); // Hide credentials in logs

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
})
.then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🏠 Host:', mongoose.connection.host);
    console.log('🌐 Using MongoDB Atlas Cloud Database');
})
.catch(err => {
    console.log('❌ MongoDB Atlas connection error:', err.message);
    console.log('💡 Please check your MongoDB Atlas connection string and network');
});

// Import routes
const userRoutes = require('./Routes/users');

// Use routes
app.use('/api/users', userRoutes);

// Basic routes
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: '🚀 PT. International Mandiri Expo Backend API is running!',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        database: 'MongoDB Atlas Cloud',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            health: '/api/health',
            test: '/api/test'
        },
        databaseStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        success: true,
        status: 'OK',
        environment: process.env.NODE_ENV || 'development',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        databaseType: 'MongoDB Atlas Cloud',
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
            database: 'MongoDB Atlas Cloud',
            status: 'Operational',
            environment: process.env.NODE_ENV || 'development'
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
            message: 'MongoDB Atlas connection test successful!',
            userCount: userCount,
            database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            databaseType: 'MongoDB Atlas Cloud'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'MongoDB Atlas connection test failed',
            error: error.message,
            solution: 'Check MongoDB Atlas connection string and network connectivity'
        });
    }
});

// MongoDB connection status route
app.get('/api/db-status', (req, res) => {
    const status = mongoose.connection.readyState;
    const statusText = {
        0: 'Disconnected',
        1: 'Connected',
        2: 'Connecting',
        3: 'Disconnecting'
    }[status] || 'Unknown';
    
    res.json({
        success: status === 1,
        status: statusText,
        database: 'MongoDB Atlas Cloud',
        environment: process.env.NODE_ENV || 'development',
        connection: {
            host: mongoose.connection.host,
            port: mongoose.connection.port,
            name: mongoose.connection.name
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Error Stack:', err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Something went wrong!',
        message: err.message,
        environment: process.env.NODE_ENV || 'development'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Route not found',
        path: req.originalUrl,
        environment: process.env.NODE_ENV || 'development',
        availableRoutes: [
            '/',
            '/api/health', 
            '/api/users', 
            '/api/test',
            '/api/test-db',
            '/api/db-status'
        ]
    });
});

// Function to start server with port auto-selection
const startServer = (port = process.env.PORT || 5000) => {
    const server = app.listen(port, 'localhost', () => {
        console.log(`\n🎯 Backend Server running on http://localhost:${port}`);
        console.log(`🏠 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🗄️ Database: MongoDB Atlas Cloud`);
        console.log(`🌐 CORS enabled for localhost`);
        console.log(`\n📊 API Endpoints:`);
        console.log(`   🔍 Health Check: http://localhost:${port}/api/health`);
        console.log(`   👥 Users API: http://localhost:${port}/api/users`);
        console.log(`   🧪 Test API: http://localhost:${port}/api/test`);
        console.log(`   💾 DB Test: http://localhost:${port}/api/test-db`);
        console.log(`   📡 DB Status: http://localhost:${port}/api/db-status`);
        console.log(`\n💡 To connect your React app:`);
        console.log(`   Set backend URL to: http://localhost:${port}`);
        console.log(`\n🚀 Server ready! Connected to MongoDB Atlas Cloud`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`\n⚠️  Port ${port} is already in use. Trying port ${Number(port) + 1}...`);
            startServer(Number(port) + 1);
        } else {
            console.error('🚨 Server error:', err);
        }
    });

    return server;
};

// Start the server
startServer();

module.exports = app;