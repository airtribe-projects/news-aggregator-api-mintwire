const express = require('express');
const { validateJWT } = require('../middlewares/authorMiddleware');
const { getPreferences, updatePreferences } = require('../controllers/preferenceController');
const router = express.Router();

// Get user preferences (protected)
router.get('/', validateJWT, getPreferences);

// Update user preferences (protected)
router.put('/', validateJWT, updatePreferences);

module.exports = router;