const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config(); // Load environment variables
const restaurant = require('./routes/restaurants')
const vehicleRoutes = require('./routes/vehicles'); // Import vehicle routes
const userRoutes = require('./routes/login'); // Import login route
const signUpRoutes = require('./routes/signin'); // Import sign-up route
const hotel = require('./routes/hotels')
const spot = require('./routes/spots')

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the app on connection failure
  }
};

// Call the function to connect to the database
connectToDatabase();

// Register routes
app.use('/spot',spot)
app.use('/vehicles', vehicleRoutes); // Vehicle routes for adding/getting vehicles
app.use('/user', userRoutes); // Login route for user authentication
app.use('/signin', signUpRoutes); // Sign-up route for user registration
app.use('/hotel',hotel)
app.use('/restaurant',restaurant)

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
