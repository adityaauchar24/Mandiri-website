import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ES6 module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            'http://localhost:3000',
            'https://your-frontend-app.onrender.com'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
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

// MongoDB Connection with Atlas
const getMongoURI = () => {
    if (process.env.MONGODB_URI) {
        return process.env.MONGODB_URI;
    }
    
    // Construct URI from individual components
    const user = encodeURIComponent(process.env.MONGO_USER || '');
    const pass = encodeURIComponent(process.env.MONGO_PASS || '');
    const database = process.env.MONGO_DATABASE || 'mandiri-database';
    
    return `mongodb+srv://${user}:${pass}@internationalmandiriexp.hnk5nhk.mongodb.net/${database}?retryWrites=true&w=majority`;
};

const MONGODB_URI = getMongoURI();

console.log('🔗 Connecting to MongoDB...');
console.log('Database:', process.env.MONGO_DATABASE || 'mandiri-database');

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
    console.log('💡 Please check your MongoDB connection and .env file');
});

// Import routes
import userRoutes from './routes/users.js';

// Use routes
app.use('/api/users', userRoutes);

// Basic routes
app.get('/', (req, res) => {
    res.json({ 
        success: true,
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
        success: true,
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
        const User = (await import('./models/User.js')).default;
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
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
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

export default app;