require('dotenv').config(); // Make sure to load the .env file

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.DB_URL; // Use DB_URL from .env
    if (!dbURI) {
      throw new Error('DB_URL is not defined');
    }
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
