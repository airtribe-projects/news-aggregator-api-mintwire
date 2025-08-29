const express = require('express');
const {fetchNews} = require('../controllers/newsController');
const { validateJWT } = require('../middlewares/authorMiddleware');
const router = express.Router();

router.get('/', validateJWT, fetchNews);

module.exports = router;
