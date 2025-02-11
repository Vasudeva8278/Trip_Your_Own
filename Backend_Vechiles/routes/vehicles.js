const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle'); // Corrected model reference

// POST route to add a new vehicle
router.post('/', async (req, res) => {
  try {
    const { name, photourl, vehicle_number, price_of_rent_per_day } = req.body;

    // Validate required fields
    if (!name || !photourl || !vehicle_number || !price_of_rent_per_day) {
      return res.status(400).json({
        error: 'All fields are required',
        missingFields: [
          !name && 'name',
          !photourl && 'photourl',
          !vehicle_number && 'vehicle_number',
          !price_of_rent_per_day && 'price_of_rent_per_day',
        ].filter(Boolean),
      });
    }

    // Create a new vehicle instance
    const newVehicle = new Vehicle({
      name,
      photourl,
      number: vehicle_number, // Mapped correctly
      per_day: price_of_rent_per_day, // Mapped correctly
    });

    const savedVehicle = await newVehicle.save();

    return res.status(201).json({
      message: 'Vehicle successfully created',
      data: savedVehicle,
    });
  } catch (error) {
    console.error('Error adding vehicle:', error.message);
    return res.status(500).json({
      error: 'Failed to add vehicle',
      details: error.message,
    });
  }
});

// GET route to fetch all vehicles
router.get('/', async (req, res) => {
  try {
    // Fetch all vehicles from the database
    const vehicles = await Vehicle.find();

    // Return the vehicle data
    return res.status(200).json({
      message: 'Vehicles retrieved successfully',
      data: vehicles, // Fixed incorrect response variable
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch vehicles',
      details: error.message,
    });
  }
});

module.exports = router;
