const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ======================
// CORS Configuration
// ======================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://papaya-sawine-880e7c.netlify.app', // Your actual Netlify URL
  'https://mandiri-project-frontend.netlify.app' // Alternative Netlify URL
];

// Enhanced CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, server-side requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For development, you might want to allow all origins
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // Block in production
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}. Allowed origins: ${allowedOrigins.join(', ')}`;
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Handle preflight requests globally
app.options('*', cors());

// ======================
// Security Middleware
// ======================
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Security headers middleware
app.use((req, res, next) => {
  // Remove sensitive headers
  res.removeHeader('X-Powered-By');
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// ======================
// MongoDB Configuration
// ======================

// Fix mongoose warnings
mongoose.set('strictQuery', false);
mongoose.set('debug', process.env.NODE_ENV === 'development');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

console.log('🔗 Connecting to MongoDB Atlas...');
console.log('🏠 Environment:', process.env.NODE_ENV || 'production');
console.log('📍 MongoDB Host:', MONGODB_URI.split('@')[1]?.split('/')[0] || 'Unknown');

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1
};

// Connect to MongoDB Atlas with retry logic
const connectWithRetry = () => {
  mongoose.connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Using MongoDB Atlas Cloud Database');
    console.log('👤 Connected as:', MONGODB_URI.split('://')[1]?.split(':')[0] || 'Unknown');
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});

// ======================
// Route Imports
// ======================
const userRoutes = require('./Routes/users');

// ======================
// API Routes
// ======================
app.use('/api/users', userRoutes);

// ======================
// Health & Status Routes
// ======================

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🚀 PT. International Mandiri Expo Backend API is running!',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'production',
    database: 'MongoDB Atlas Cloud',
    timestamp: new Date().toISOString(),
    status: 'operational',
    endpoints: {
      users: '/api/users',
      health: '/api/health',
      test: '/api/test',
      dbStatus: '/api/db-status'
    },
    databaseStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const isHealthy = dbStatus === 'connected';
  
  res.status(isHealthy ? 200 : 503).json({ 
    success: isHealthy,
    status: isHealthy ? 'healthy' : 'unhealthy',
    environment: process.env.NODE_ENV || 'production',
    database: dbStatus,
    databaseType: 'MongoDB Atlas Cloud',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    responseTime: `${process.hrtime()[0]}s`
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: '✅ Backend API is working perfectly!',
    timestamp: new Date().toISOString(),
    data: {
      server: 'Express.js',
      database: 'MongoDB Atlas Cloud',
      status: 'Operational',
      environment: process.env.NODE_ENV || 'production',
      cors: {
        enabled: true,
        allowedOrigins: allowedOrigins
      }
    }
  });
});

// Database connection test
app.get('/api/test-db', async (req, res) => {
  try {
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    
    res.json({
      success: true,
      message: '🎉 MongoDB Atlas connection test successful!',
      userCount: userCount,
      database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      databaseType: 'MongoDB Atlas Cloud',
      connectionDetails: {
        host: mongoose.connection.host,
        name: mongoose.connection.name,
        readyState: mongoose.connection.readyState
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ MongoDB Atlas connection test failed',
      error: error.message,
      solution: 'Check MongoDB Atlas connection string and network connectivity'
    });
  }
});

// Database status endpoint
app.get('/api/db-status', (req, res) => {
  const status = mongoose.connection.readyState;
  const statusText = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }[status] || 'unknown';
  
  const isConnected = status === 1;
  
  res.json({
    success: isConnected,
    status: statusText,
    database: 'MongoDB Atlas Cloud',
    environment: process.env.NODE_ENV || 'production',
    connection: {
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
      readyState: status
    },
    timestamp: new Date().toISOString()
  });
});

// Server info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    server: {
      name: 'PT. International Mandiri Expo API',
      version: '2.0.0',
      environment: process.env.NODE_ENV || 'production',
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid
    },
    database: {
      type: 'MongoDB Atlas',
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      name: mongoose.connection.name
    },
    cors: {
      enabled: true,
      allowedOrigins: allowedOrigins
    },
    timestamp: new Date().toISOString()
  });
});

// ======================
// Error Handling Middleware
// ======================

// 404 Handler - Catch all undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/users',
      'POST /api/users',
      'GET /api/test',
      'GET /api/test-db',
      'GET /api/db-status',
      'GET /api/info'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Error Stack:', err.stack);
  
  // CORS errors
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      error: 'CORS Error',
      message: err.message,
      allowedOrigins: allowedOrigins,
      environment: process.env.NODE_ENV || 'production'
    });
  }
  
  // MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(500).json({
      success: false,
      error: 'Database Error',
      message: 'A database error occurred',
      environment: process.env.NODE_ENV || 'production'
    });
  }
  
  // Default error response
  res.status(500).json({ 
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
  });
});

// ======================
// Server Configuration
// ======================
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('\n⚠️ Received SIGINT. Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️ Received SIGTERM. Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed.');
  process.exit(0);
});

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`\n🎯 ==========================================`);
  console.log(`🚀 Backend Server successfully started!`);
  console.log(`📍 URL: https://mandiri-project-backend-cnv1.onrender.com`);
  console.log(`🔧 Port: ${PORT}`);
  console.log(`🏠 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🗄️ Database: MongoDB Atlas Cloud`);
  console.log(`📊 Node.js: ${process.version}`);
  console.log(`🎯 ==========================================`);
  console.log(`\n📋 Available Endpoints:`);
  console.log(`   ✅ Health Check: /api/health`);
  console.log(`   👥 Users API: /api/users`);
  console.log(`   🧪 Test API: /api/test`);
  console.log(`   💾 DB Status: /api/db-status`);
  console.log(`   ℹ️ Server Info: /api/info`);
  console.log(`\n🌐 CORS Enabled for:`);
  allowedOrigins.forEach(origin => console.log(`   🔗 ${origin}`));
  console.log(`\n🚀 Server ready! Connected to MongoDB Atlas Cloud`);
  console.log(`🎯 ==========================================\n`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', error);
    process.exit(1);
  }
});

module.exports = app;