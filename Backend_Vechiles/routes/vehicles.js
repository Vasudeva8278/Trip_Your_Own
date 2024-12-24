const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle'); // Import the Vehicle model

// POST route to add a new vehicle
router.post('/add', async (req, res) => {
  try {
    const { name, photourl, vehicle_number, price_of_rent_per_day } = req.body;

    // Check if all required fields are provided
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

    // Create a new vehicle document
    const vehicle = new Vehicle({
      name,
      photourl,
      vehicle_number,
      price_of_rent_per_day,
    });

    // Save the new vehicle to the database
    const savedVehicle = await vehicle.save();

    return res.status(201).json({
      message: 'Vehicle added successfully',
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
router.get('/get', async (req, res) => {
  try {
    // Fetch all vehicles from the database
    const vehicles = await Vehicle.find();

    // Return the vehicle data
    return res.status(200).json({
      message: 'Vehicles retrieved successfully',
      data: vehicles,
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error.message);

    return res.status(500).json({
      error: 'Failed to fetch vehicles',
      details: error.message,
    });
  }
});

// GET route to fetch a single vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find vehicle by ID
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        error: 'Vehicle not found',
      });
    }

    return res.status(200).json({
      message: 'Vehicle retrieved successfully',
      data: vehicle,
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error.message);

    return res.status(500).json({
      error: 'Failed to fetch vehicle',
      details: error.message,
    });
  }
});

module.exports = router;
