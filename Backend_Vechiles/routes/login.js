const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// JWT Secret (Should be stored securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Test route to verify login API is accessible
router.get('/', (req, res) => {
  res.send('Welcome to the login API');
});

// POST route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      console.error('Missing username or password');
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Trim whitespace from input to avoid mismatches
    const trimmedUsername = username.trim();

    // Find the user by username
    const user = await User.findOne({ username: trimmedUsername });
    if (!user) {
      console.error(`User not found: ${trimmedUsername}`);
      return res.status(404).json({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Password mismatch');
      console.log('Entered password:', password);
      console.log('Stored hash:', user.password);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Successful response
    console.log(`User ${username} logged in successfully`);
    return res.status(200).json({
      message: 'Login successful',
      token, // Include the token in the response
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
