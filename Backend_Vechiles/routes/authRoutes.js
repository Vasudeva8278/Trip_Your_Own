const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
router.post('/post', async (req, res) => {
  const { username, password, name, email } = req.body;

  // Validate required fields
  if (!username || !password || !name || !email) {
    return res.status(400).json({
      error: 'All fields are required',
      missingFields: [
        !username && 'username',
        !password && 'password',
        !name && 'name',
        !email && 'email',
      ].filter(Boolean),
    });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      password,
      name,
      email,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      data: savedUser,
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
    return res.status(500).json({
      error: 'Failed to register user',
      details: error.message,
    });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate required fields
  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password are required',
      missingFields: [
        !username && 'username',
        !password && 'password',
      ].filter(Boolean),
    });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    return res.status(500).json({
      error: 'Failed to log in user',
      details: error.message,
    });
  }
});

// Get All Users
router.get('/users', async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await User.find().select('-password'); // Exclude the password field
  
      return res.status(200).json({
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (error) {
      console.error('Error retrieving users:', error.message);
      return res.status(500).json({
        error: 'Failed to retrieve users',
        details: error.message,
      });
    }
  });
  

module.exports = router;
