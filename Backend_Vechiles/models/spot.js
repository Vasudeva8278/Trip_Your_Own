const mongoose = require('mongoose');

// Define the schema for Restaurant
const spotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photourl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
   
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
const Restaurant = mongoose.model('spot', spotSchema);

module.exports = Restaurant;
