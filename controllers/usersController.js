const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// Register user
const registerUser = async (user) => {
    // Validate required fields
    if (!user.username || !user.email || !user.password) {
        return { status: 400, message: 'username, email, and password are required' };
    }

    // Check for existing username or email
    const existingUser = await userModel.findOne({
        $or: [
            { username: user.username },
            { email: user.email }
        ]
    });
    if (existingUser) {
        return { status: 409, message: 'Username or email already exists' };
    }

    // Hash password and create user
    user.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
    const dbUser = await userModel.create({
        username: user.username,
        email: user.email,
        password: user.password
    });

    // Generate JWT token
    const payload = { id: dbUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return { status: 200, user: dbUser, token };
};

// Login user
const loginUser = async (username, password) => {
    if (!username || !password) {
        return { status: 400, message: "username and password are required" };
    }

    const dbUser = await userModel.findOne({ username });
    if (!dbUser) {
        return { status: 404, message: 'User not found' };
    }

    const isSamePassword = bcrypt.compareSync(password, dbUser.password);
    if (!isSamePassword) {
        return { status: 401, message: 'Invalid password' };
    }

    const payload = { id: dbUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return { status: 200, token };
}

module.exports = { registerUser, loginUser };
