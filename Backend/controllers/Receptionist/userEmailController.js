const User = require('../../Models/userModel')
const { default: mongoose } = require('mongoose')

const getUserEmails = async (req, res) => {
    try {
        // Using .find() to get all users and select only the 'email' field
        const users = await User.find({ role: 'manager' }).select('email');
        // Extracting just the emails into an array
        const emails = users.map(User => User.email);
        res.json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user emails', error: error.message });
    }
};

module.exports = {
    getUserEmails
};