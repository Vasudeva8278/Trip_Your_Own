const express = require('express');
const {
  getUserProfile,
  getUserOrders,
  getUserNotifications
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Routes - Requires authentication
router.get('/profile', authMiddleware, getUserProfile); // Fetch user profile
router.get('/orders', authMiddleware, getUserOrders); // Fetch user orders
router.get('/notifications', authMiddleware, getUserNotifications); // Fetch user notifications

module.exports = router;
