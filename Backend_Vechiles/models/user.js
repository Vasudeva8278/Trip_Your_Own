const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

// Define the User schema
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
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Middleware to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is new or modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare entered password with hashed password
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
