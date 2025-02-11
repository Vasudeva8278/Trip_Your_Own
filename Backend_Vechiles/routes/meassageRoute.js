const express = require('express');
const router = express.Router();
const Message = require('../models/meassage'); // Import the Message model
const authMiddleware = require('../middleware/authMiddleware'); // Import auth middleware

// POST /message/post
router.post('/post', authMiddleware, async (req, res) => {
  try {
    const { to_user_id, subject, content, attachments } = req.body;

    if (!to_user_id || !subject || !content) {
      return res.status(400).json({ error: 'to_user_id, subject, and content are required' });
    }

    const newMessage = new Message({
      from_user_id: req.user.id, // Authenticated user's ID
      to_user_id,
      subject,
      content,
      attachments: attachments || [], // Optional attachments
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', message: savedMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});


// Get Inbox Messages (Messages received by the user)
router.get('/inbox', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch messages where the authenticated user is the recipient
    const messages = await Message.find({ to_user_id: userId })
      .populate('from_user_id', 'username email') // Populate sender details
      .populate('to_user_id', 'username email') // Populate recipient details
      .sort({ createdAt: -1 });

    res.status(200).json({ message: 'Inbox messages fetched successfully', messages });
  } catch (error) {
    console.error('Error fetching inbox messages:', error);
    res.status(500).json({ error: 'Failed to fetch inbox messages. Please try again.' });
  }
});

// Get Sent Messages (Messages sent by the user)
router.get('/sent', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch messages where the authenticated user is the sender
    const messages = await Message.find({ from_user_id: userId })
      .populate('from_user_id', 'username email') // Populate sender details
      .populate('to_user_id', 'username email') // Populate recipient details
      .sort({ createdAt: -1 });

    res.status(200).json({ message: 'Sent messages fetched successfully', messages });
  } catch (error) {
    console.error('Error fetching sent messages:', error);
    res.status(500).json({ error: 'Failed to fetch sent messages. Please try again.' });
  }
});

// Update Message Status (Mark as Read, Delivered, etc.)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Sent', 'Delivered', 'Read'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message status updated successfully', updatedMessage });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({ error: 'Failed to update message status. Please try again.' });
  }
});

module.exports = router;
