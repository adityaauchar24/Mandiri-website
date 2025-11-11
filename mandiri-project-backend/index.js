const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix mongoose warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mandiri-db';

console.log('🔗 Connecting to MongoDB...');
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('💡 Using in-memory data instead');
  });

// Import routes with error handling
let userRoutes;
try {
  userRoutes = require('./routes/users');
  console.log('✅ Users route loaded successfully');
} catch (error) {
  console.log('⚠️  Users route not found, using default routes');
  // Create a basic router if routes file doesn't exist
  userRoutes = require('express').Router();
  userRoutes.get('/', (req, res) => {
    res.json({ 
      message: 'Users API is working!',
      note: 'Create routes/users.js for full functionality',
      timestamp: new Date().toISOString()
    });
  });
}

// Use routes
app.use('/api/users', userRoutes);

// Basic routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Mandiri Backend API is running!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: '/api/users',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Test route without external files
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test route working!',
    data: ['item1', 'item2', 'item3'],
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    availableRoutes: ['/', '/health', '/api/users', '/api/test']
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Server running on port ${PORT}`);
  console.log(`🏠 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'all origins'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
});