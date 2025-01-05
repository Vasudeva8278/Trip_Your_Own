const Booking = require('../models/booking'); // Import the Booking model

// Create booking function
const createBooking = async (req, res) => {
  try {
    const { user, vehicle, vehicleLicense, totalAmount, status } = req.body;

    // Check if all required fields are provided
    if (!vehicleLicense) {
      return res.status(400).json({ error: 'Vehicle license plate is required' });
    }

    // Create a new booking document
    const newBooking = new Booking({
      user,
      vehicle,
      vehicleLicense,
      totalAmount,
      status
    });

    // Save the booking to the database
    const booking = await newBooking.save();

    // Return the created booking
    return res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(400).json({ error: 'Error creating booking' });
  }
};

module.exports = { createBooking };
