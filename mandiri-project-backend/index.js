const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - Allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}));

// Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());

// Fix mongoose warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mandiri-db')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB connection error:', err.message));

// Import routes
const userRoutes = require('./routes/users');

// Use routes
app.use('/users', userRoutes);

// Basic routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Mandiri Backend API is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001; // Changed to 5001

app.listen(PORT, () => {
  console.log(`🎯 Server running on http://localhost:${PORT}`);
  console.log(`👥 Users API: http://localhost:${PORT}/users`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});