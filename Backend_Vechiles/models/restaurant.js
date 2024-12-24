const mongoose = require('mongoose');

// Define the schema for Restaurant
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photourl: {
    type: String,
    required: true,
  },
  minimum_cost: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
