const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();    

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token and extract user info

const validateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; // <--- fix here
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // expects "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken; // contains { id: dbUser._id }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};


module.exports = {
    validateJWT
};