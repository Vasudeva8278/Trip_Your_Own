const express = require('express');
const { registerUser, loginUser, forgotPassword,getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser); // Sign up
router.post('/login', loginUser); // Sign in
router.post('/forgot-password', forgotPassword); // Forgot password (for email reset link)
router.get('/getusers', getAllUsers); // Forgot password (for email reset link)

module.exports = router;
