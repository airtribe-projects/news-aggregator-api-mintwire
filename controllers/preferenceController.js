const userModel = require('../models/usersModel');

// Get logged-in user's preferences
const getPreferences = async (req, res) => {
    console.log('Authenticated user:', req.user);
    try {
        const user = await userModel.findById(req.user.id);
        console.log('Found user:', user);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        res.json({ status: 200, preferences: user.preferences || {} });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


// Update logged-in user's preferences
const updatePreferences = async (req, res) => {
    try {
        const { preferences } = req.body;
        if (!preferences) {
            return res.status(400).json({ status: 400, message: "Preferences are required" });
        }
        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            { preferences },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        res.json({ status: 200, preferences: user.preferences });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = {
    getPreferences,
    updatePreferences
};