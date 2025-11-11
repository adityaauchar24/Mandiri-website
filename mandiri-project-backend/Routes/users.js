const express = require('express');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  res.json({
    message: 'Get all users - Success!',
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ],
    timestamp: new Date().toISOString()
  });
});

// GET user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `Get user ${userId} - Success!`,
    user: { id: userId, name: 'Sample User', email: 'user@example.com' },
    timestamp: new Date().toISOString()
  });
});

// POST create new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  res.json({
    message: 'User created successfully!',
    user: { id: Date.now(), name, email },
    timestamp: new Date().toISOString()
  });
});

// PUT update user
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  res.json({
    message: `User ${userId} updated successfully!`,
    user: { id: userId, name, email },
    timestamp: new Date().toISOString()
  });
});

// DELETE user
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({
    message: `User ${userId} deleted successfully!`,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;