const mongoose = require('mongoose');

// Define the schema
const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photourl: {
    type: String,
    required: true,
  },
  vehicle_number: {
    type: String,
    required: true,
    unique: true,
  },
  price_of_rent_per_day: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
