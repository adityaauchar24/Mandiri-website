const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://your-netlify-app-name.netlify.app' // Replace with your actual Netlify URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.options('*', cors());

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Fix mongoose warning
mongoose.set('strictQuery', false);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔗 Connecting to MongoDB Atlas...');
console.log('🏠 Environment:', process.env.NODE_ENV || 'production');

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
  console.log('🌐 Using MongoDB Atlas Cloud Database');
})
.catch(err => {
  console.log('❌ MongoDB Atlas connection error:', err.message);
  console.log('💡 Please check your MongoDB Atlas connection string');
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
    environment: process.env.NODE_ENV || 'production',
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
    environment: process.env.NODE_ENV || 'production',
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
      environment: process.env.NODE_ENV || 'production'
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
    environment: process.env.NODE_ENV || 'production',
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
    environment: process.env.NODE_ENV || 'production'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    environment: process.env.NODE_ENV || 'production',
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🎯 Backend Server running on port ${PORT}`);
  console.log(`🏠 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🗄️ Database: MongoDB Atlas Cloud`);
  console.log(`\n📊 API Endpoints:`);
  console.log(`   🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`   👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`   🧪 Test API: http://localhost:${PORT}/api/test`);
  console.log(`\n🚀 Server ready! Connected to MongoDB Atlas Cloud`);
});

module.exports = app;