const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'https://mandiri-international.cyclic.app',
        'https://mandiri-project.cyclic.app',
        'http://localhost:3000',
        'http://localhost:3001'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

app.options('*', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fix mongoose warning
mongoose.set('strictQuery', false);

// MongoDB Connection for Cyclic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aucharsujata_db_user:p35dkta56d3UlxNk@cluster0.ffacq4b.mongodb.net/mandiri-database?retryWrites=true&w=majority';

console.log('🔗 Connecting to MongoDB...');
console.log('📊 Database: mandiri-database');
console.log('🏠 Environment:', process.env.NODE_ENV || 'production');

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🏠 Host:', mongoose.connection.host);
})
.catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
});

// Import and use backend routes
const userRoutes = require('./mandiri-project-backend/Routes/users');
app.use('/api/users', userRoutes);

// API Routes
app.get('/api', (req, res) => {
    res.json({ 
        success: true,
        message: '🚀 PT. International Mandiri Expo Full-Stack API is running on Cyclic!',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'production',
        timestamp: new Date().toISOString(),
        endpoints: {
            users: '/api/users',
            health: '/api/health',
            test: '/api/test',
            info: '/api/info'
        },
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        success: true,
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        environment: process.env.NODE_ENV || 'production',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Test route working! Full-stack app is properly configured on Cyclic.',
        timestamp: new Date().toISOString(),
        data: {
            server: 'Express.js',
            database: 'MongoDB',
            deployment: 'Cyclic.sh',
            status: 'Operational'
        }
    });
});

app.get('/api/info', (req, res) => {
    res.json({
        success: true,
        app: 'PT. International Mandiri Expo',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'production',
        platform: 'Cyclic.sh',
        timestamp: new Date().toISOString(),
        database: {
            status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            name: mongoose.connection.name,
            host: mongoose.connection.host
        }
    });
});

// Test database connection route
app.get('/api/test-db', async (req, res) => {
    try {
        const User = require('./mandiri-project-backend/models/User');
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

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, 'mandiri-project-frontend/build')));
    
    // Serve React app for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'mandiri-project-frontend/build', 'index.html'));
    });
} else {
    // In development, just show a message for root route
    app.get('/', (req, res) => {
        res.json({
            success: true,
            message: 'PT. International Mandiri Expo - Development Mode',
            instructions: 'Frontend runs on http://localhost:3000, Backend API on this server',
            environment: 'development'
        });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Error Stack:', err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'API route not found',
        path: req.originalUrl,
        availableRoutes: [
            '/api',
            '/api/health', 
            '/api/users', 
            '/api/test',
            '/api/test-db',
            '/api/info'
        ]
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🎯 Full-Stack Server running on port ${PORT}`);
    console.log(`🏠 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`🔗 API Base: http://localhost:${PORT}/api`);
    console.log(`💾 Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`🚀 Ready for Cyclic deployment!`);
});

module.exports = app;