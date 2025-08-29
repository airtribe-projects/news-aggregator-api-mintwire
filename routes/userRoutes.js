const { registerUser, loginUser } = require('../controllers/usersController');
const express = require('express');
const router = express.Router();

// Register user
router.post('/signup', async (req, res) => {
    try {
        console.log("📥 Incoming body:", req.body); 
        const user = req.body;
        const dbUser = await registerUser(user);
        res.status(dbUser.status).json(dbUser);
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const dbUser = await loginUser(username, password);
        res.status(dbUser.status).json(dbUser);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});

module.exports = router;
