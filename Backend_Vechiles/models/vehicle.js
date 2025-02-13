const mongoose = require('mongoose');


const VehicleSchema = new mongoose.Schema({
  name: {
    type: String, // Corrected type from 'string' to 'String'
    required: true,
    trim: true,
  },
  photourl: {
    type: String,
    required: true,
  },
  number:{
    type:String,
    required:true,
},
  per_day: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number, // Assuming the rating is a number (e.g., 1 to 5)
    required: true,
    min: 0, // Optional: Add a min value for the rating, like 0 or 1
    max: 5, // Optional: Add a max value for the rating, like 5
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema
const Vehicle = mongoose.model('Vehicle', VehicleSchema); // Corrected model name to 'Hotel'

module.exports = Vehicle; // Export the Hotel model
