const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle', // Reference to the Vehicle model
      required: true,
    },
    vehicleLicense: {
      type: String,
      required: true, // License plate number of the vehicle
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed'],
      default: 'Confirmed', // Directly set the default status to 'Confirmed'
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);
