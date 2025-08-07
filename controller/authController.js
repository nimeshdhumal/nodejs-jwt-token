const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//This will handle login logic and JWT generation.
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

//Login User function
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (user && (await user.comparePassword(password))) {
            const token = generateToken(user.id, user.role);
            res.status(200).json({
                id: user.id,
                username: user.username,
                role: user.role,
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//Logout User
const logoutUser = (req, res) => {
    res.status(200).json({ message: `User ${req.user.id} logged out successfully (token discarded client-side)` });
};

//get Profile
const getProfile = (req, res) => {
    res.status(200).json({
        id: req.user.id,
        role: req.user.role,
        message: "Welcome to your profile!"
    });
};

module.exports = { loginUser, logoutUser, getProfile }