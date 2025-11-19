const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const net = require('net');
require('dotenv').config();

const app = express();

// CORS configuration for local development
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
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

// MongoDB Connection - Local Development Only
const MONGODB_URI = 'mongodb+srv://aucharsujata_db_user:p35dkta56d3UlxNk@cluster0.ffacq4b.mongodb.net/mandiri-database?retryWrites=true&w=majority';

console.log('🔗 Connecting to MongoDB...');
console.log('Database: mandiri-database');

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
        environment: 'development',
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
        success: true,
        status: 'OK',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        environment: 'development',
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
        message: err.message
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

// Function to check if port is available
const isPortAvailable = (port) => {
    return new Promise((resolve) => {
        const server = net.createServer();
        
        server.listen(port, () => {
            server.close(() => {
                resolve(true);
            });
        });
        
        server.on('error', () => {
            resolve(false);
        });
    });
};

// Find available port
const findAvailablePort = async (startPort) => {
    let port = startPort;
    const maxPort = startPort + 10;
    
    while (port <= maxPort) {
        const available = await isPortAvailable(port);
        if (available) {
            return port;
        }
        port++;
    }
    
    throw new Error(`No available ports found between ${startPort} and ${maxPort}`);
};

// Start server
const startServer = async () => {
    const defaultPort = 5001;
    
    try {
        const availablePort = await findAvailablePort(defaultPort);
        
        app.listen(availablePort, '0.0.0.0', () => {
            console.log(`\n🎯 Server running on port ${availablePort}`);
            console.log(`🏠 Environment: development`);
            console.log(`🌐 CORS enabled for: http://localhost:3000, http://localhost:3001`);
            console.log(`\n📊 API Endpoints:`);
            console.log(`   🔍 Health Check: http://localhost:${availablePort}/health`);
            console.log(`   👥 Users API: http://localhost:${availablePort}/api/users`);
            console.log(`   🧪 Test API: http://localhost:${availablePort}/api/test`);
            console.log(`   💾 DB Test: http://localhost:${availablePort}/api/test-db`);
            console.log(`\n🚀 Server ready!`);
            
            if (availablePort !== defaultPort) {
                console.log(`\n⚠️  Note: Port ${defaultPort} was busy, using port ${availablePort} instead`);
                console.log(`   Update your frontend .env file:`);
                console.log(`   REACT_APP_API_BASE_URL=http://localhost:${availablePort}`);
            }
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.log('\n💡 Solution: Kill processes using ports 5001-5010 or use:');
        console.log('   netstat -ano | findstr :5001');
        console.log('   taskkill /PID <PID> /F');
    }
};

startServer();

module.exports = app;