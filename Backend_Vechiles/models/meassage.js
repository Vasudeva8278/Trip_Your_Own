const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    from_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    to_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: [
      {
        filename: String,
        fileUrl: String, // URL to the stored file
        fileType: String, // e.g., 'image/png', 'application/pdf'
      },
    ],
    status: {
      type: String,
      enum: ['Sent', 'Delivered', 'Read'],
      default: 'Sent',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Message', messageSchema);
