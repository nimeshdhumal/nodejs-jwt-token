//This will handle user registration.
const User = require('../models/User');

//This function calls for registration;;;
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const userExists = await User.findOne({ where: { username } });//Checking the user exists or not;;;
        if (userExists) {
            return res.status(400).json({ messgae: "User already exists." });
        }

        const user = await User.create({ username, password, role });//Sequelize method call for save the data;;;
        if (user) {
            res.status(201).json({
                id: user.id,
                username: user.username,
                role: user.role,
                message: 'User registered successfully',
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser }