const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// POST route for user registration (Sign up)

router.get('/',(req,res)=>{
  res.send("welcome signin")
})


router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      username: user.username,
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET route to fetch a user's details by username
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude sensitive information like the password
    return res.status(200).json({
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET route to fetch all users
router.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}, 'username _id'); // Exclude sensitive data like password

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
