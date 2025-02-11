const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const user = new User({ username, password });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

// Login user and issue a JWT token
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, username: 1 }); // Select only necessary fields
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
// Forgot password handler (e.g., sending reset email) – placeholder for real implementation
const forgotPassword = (req, res) => {
  // Send email with reset link (to be implemented)
  res.status(200).json({ message: 'Password reset link sent to email' });
};



module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  getAllUsers,
};
