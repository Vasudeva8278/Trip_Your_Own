const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController'); // Controller functions
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// POST: Create a new booking (Protected route)
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const bookingData = req.body;

    // Use the controller to create a booking
    const booking = await createBooking({ userId: req.user.id, ...bookingData });
    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Failed to create booking. Please try again.' });
  }
});

// GET: Fetch all bookings for the authenticated user (Protected route)
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Use the controller to fetch bookings
    const bookings = await getBookings(userId);
    return res.status(200).json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings. Please try again.' });
  }
});

module.exports = router;
