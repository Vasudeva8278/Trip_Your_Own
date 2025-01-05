const User = require('../models/usermangement');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Find the user by ID, excluding the password field
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user's profile details
    res.status(200).json({
      userId :user.userId,
      username: user.username,
      name: user.name,  // Returning name as part of the user profile
      email: user.email, // Returning email as part of the user profile
      preferences: user.preferences, // Returning user preferences
      bookingHistory: user.bookingHistory, // Returning user's booking history
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

// Get user orders (placeholder)
const getUserOrders = async (req, res) => {
  try {
    // Ideally fetch orders from an 'Orders' collection or similar
    const orders = await Order.find({ userId: req.user.id }); // Example query to find user orders
    
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch orders, please try again later' });
  }
};

// Get user notifications (placeholder)
const getUserNotifications = async (req, res) => {
  try {
    // Ideally fetch notifications from a 'Notifications' collection or similar
    const notifications = await Notification.find({ userId: req.user.id }); // Example query for notifications
    
    if (!notifications.length) {
      return res.status(404).json({ message: 'No notifications found' });
    }

    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch notifications, please try again later' });
  }
};

module.exports = {
  getUserProfile,
  getUserOrders,
  getUserNotifications,
};
