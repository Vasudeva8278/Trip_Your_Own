const express = require('express');
const User = require('./models/User');
const authMiddleware = require('./middlewares/authMiddleware');

const router = express.Router();

// Get User Profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).send({ error: 'User not found' });
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Update User Profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, profilePic, preferences } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, profilePic, preferences },
      { new: true }
    ).select('-password');
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Get Booking History
router.get('/profile/bookings', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('bookingHistory');
    if (!user) return res.status(404).send({ error: 'User not found' });
    res.send(user.bookingHistory);
  } catch (err) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
