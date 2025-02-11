const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Import booking model
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware

// Create Booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { vehicles, bookingDate, totalAmount } = req.body;

    if (!vehicles || vehicles.length === 0) {
      return res.status(400).json({ error: 'At least one vehicle is required' });
    }

    // Extract first vehicle (assuming only one for now)
    const { vehicleId } = vehicles[0];

    const newBooking = new Booking({
      user: req.user.id,
      vehicle: vehicleId,
      bookingDate,
      vehicleLicense: req.body.vehicleLicense,
      totalAmount,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking. Please try again.' });
  }
});

// Get User Bookings
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('vehicle');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.status(200).json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings. Please try again.' });
  }
});

module.exports = router;
