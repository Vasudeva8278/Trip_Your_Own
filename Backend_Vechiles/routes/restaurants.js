const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant'); // Corrected model name to 'Restaurant'

// POST route to add a new restaurant
router.post('/add', async (req, res) => {
    try {
      const { name, photourl, minimum_cost, rating } = req.body;
  
      // Validate required fields
      if (!name || !photourl || !minimum_cost || !rating) {
        return res.status(400).json({
          error: 'All fields are required',
          missingFields: [
            !name && 'name',
            !photourl && 'photourl',
            !minimum_cost && 'minimum_cost',
            !rating && 'rating',
          ].filter(Boolean),
        });
      }
  
      // Create new restaurant instance
      const newRestaurant = new Restaurant({
        name,
        photourl,
        minimum_cost,  // Use minimum_cost here
        rating,
      });
  
      // Save the restaurant to the database
      const savedRestaurant = await newRestaurant.save();
  
      return res.status(201).json({
        message: 'Restaurant added successfully',
        data: savedRestaurant,
      });
    } catch (error) {
      console.error('Error adding restaurant:', error.message);
      return res.status(500).json({
        error: 'Failed to add restaurant',
        details: error.message,
      });
    }
  });
  
router.get('/get', async (req, res) => {
  try {
    // Fetch all restaurants from the database
    const restaurants = await Restaurant.find();

    // Return the restaurant data
    return res.status(200).json({
      message: 'Restaurants retrieved successfully',
      data: restaurants,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch restaurants',
      details: error.message,
    });
  }
});

// GET route to fetch a single restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find restaurant by ID
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found',
      });
    }

    return res.status(200).json({
      message: 'Restaurant retrieved successfully',
      data: restaurant,
    });
  } catch (error) {
    console.error('Error fetching restaurant:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch restaurant',
      details: error.message,
    });
  }
});

module.exports = router;
