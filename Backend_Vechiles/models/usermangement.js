const mongoose = require('mongoose');

const userManagementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  preferences: { type: Object, default: {} },
  bookingHistory: [
    {
      bookingId: { type: String, required: true },
      date: { type: Date, required: true },
      details: { type: String, required: true },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('UserManagement', userManagementSchema);
