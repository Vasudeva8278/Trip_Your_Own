const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel'); // Assuming you are using the Hotel model

// POST route to add a new hotel
router.post('/post', async (req, res) => {
  try {
    const { name, photourl, per_day, rating } = req.body;

    // Validate required fields
    if (!name || !photourl || !per_day || !rating) {
      return res.status(400).json({
        error: 'All fields are required',
        missingFields: [
          !name && 'name',
          !photourl && 'photourl',
          !per_day && 'per_day',
          !rating && 'rating',
        ].filter(Boolean),
      });
    }

    // Create new hotel instance
    const newHotel = new Hotel({
      name,
      photourl,
      per_day,
      rating,
    });

    // Save the hotel to the database
    const savedHotel = await newHotel.save();

    return res.status(201).json({
      message: 'Hotel added successfully',
      data: savedHotel,
    });
  } catch (error) {
    console.error('Error adding hotel:', error.message);
    return res.status(500).json({
      error: 'Failed to add hotel',
      details: error.message,
    });
  }
});

// GET route to fetch all hotels
router.get('/get', async (req, res) => {
  try {
    // Fetch all hotels from the database
    const hotels = await Hotel.find();

    // Return the hotel data
    return res.status(200).json({
      message: 'Hotels retrieved successfully',
      data: hotels,
    });
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch hotels',
      details: error.message,
    });
  }
});

// GET route to fetch a single hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find hotel by ID
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({
        error: 'Hotel not found',
      });
    }

    return res.status(200).json({
      message: 'Hotel retrieved successfully',
      data: hotel,
    });
  } catch (error) {
    console.error('Error fetching hotel:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch hotel',
      details: error.message,
    });
  }
});

module.exports = router;
