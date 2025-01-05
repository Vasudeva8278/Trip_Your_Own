const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Modify the User schema to include profile-related fields
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters'],
      trim: true, // Remove extra spaces
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true, // Trim spaces from the name
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true, // Make email lowercase to avoid duplication due to case differences
      trim: true, // Remove spaces around email
    },
    preferences: {
      type: Object, // A placeholder for user preferences, can be extended to specific fields
      default: {}
    },
    bookingHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking', // Reference to a 'Booking' model, assuming you have one
    }],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Middleware to hash the password before saving it
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is a new document
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed with saving the user
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Instance method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare the entered password with the stored hashed password
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
