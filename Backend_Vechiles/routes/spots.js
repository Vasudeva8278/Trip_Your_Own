const express = require('express');
const router = express.Router();
const spot = require('../models/spot'); // Corrected model name to 'Restaurant'

// POST route to add a new restaurant
router.post('/add', async (req, res) => {
    try {
      const { name, photourl, description, rating } = req.body;
  
      // Validate required fields
      if (!name || !photourl || !description || !rating) {
        return res.status(400).json({
          error: 'All fields are required',
          missingFields: [
            !name && 'name',
            !photourl && 'photourl',
            !description && 'description',
            !rating && 'rating',
          ].filter(Boolean),
        });
      }
  
      // Create new restaurant instance
      const newspot = new spot({
        name,
        photourl,
        description,  
        rating,
      });
  
      // Save the restaurant to the database
      const savedspot = await newspot.save();
  
      return res.status(201).json({
        message: 'spot added successfully',
        data: savedspot,
      });
    } catch (error) {
      console.error('Error adding spot:', error.message);
      return res.status(500).json({
        error: 'Failed to add spot',
        details: error.message,
      });
    }
  });
  
router.get('/get', async (req, res) => {
  try {
    // Fetch all restaurants from the database
    const restaurants = await spot.find();

    // Return the restaurant data
    return res.status(200).json({
      message: 'spot retrieved successfully',
      data: restaurants,
    });
  } catch (error) {
    console.error('Error fetching spot:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch spot',
      details: error.message,
    });
  }
});

// GET route to fetch a single restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find restaurant by ID
    const restaurant = await spot.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        error: 'spot not found',
      });
    }

    return res.status(200).json({
      message: 'spot retrieved successfully',
      data: restaurant,
    });
  } catch (error) {
    console.error('Error fetching spot:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch spot',
      details: error.message,
    });
  }
});

module.exports = router;
