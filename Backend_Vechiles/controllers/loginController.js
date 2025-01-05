const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model

// JWT Secret (Should be stored securely, e.g., in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.error(`Login failed: User not found for username: ${username}`);
      return res.status(404).json({ error: 'Invalid username or password' });
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    // Log the entered password and stored hash for debugging
    console.log(`Entered password: ${password}`);
    console.log(`Stored hash: ${user.password}`);

    if (!isMatch) {
      console.error(`Login failed: Password mismatch for username: ${username}`);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    console.log(`User ${username} logged in successfully.`);
    return res.status(200).json({
      message: 'Login successful',
      token, // Include the token in the response
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = {
  loginUser,
};
