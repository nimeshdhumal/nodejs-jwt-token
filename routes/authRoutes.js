const express = require('express');
const { loginUser, logoutUser, getProfile } = require('../controller/authController');
const { registerUser } = require('../controller/userController');
const { protect } = require('../middleware/authentication');
const { authorize } = require('../middleware/authorization');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/logout', protect, logoutUser);
router.get('/admin-dashboard', protect, authorize('admin'), (req, res) => {
  res.status(200).json({ message: `Welcome to the Admin Dashboard, user ${req.user.id}!` });
});

module.exports = router;