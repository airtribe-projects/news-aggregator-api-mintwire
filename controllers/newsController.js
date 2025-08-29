const axios = require('axios');
const User = require('../models/usersModel');

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// Fetch news based on user preferences
const fetchNews = async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        const {categories = [], languages = []} = user.preferences || {};

        const params ={
            apiKey: NEWS_API_KEY,
            category: categories.join(',') || undefined,
            language: languages.join(',') || undefined,
            pageSize: 10
        }

        const response = await axios.get(NEWS_API_URL, { params });
        console.log('Fetching news for:', categories, languages, NEWS_API_URL, params);
        return res.status(200).json({ status: 200, data: response.data.articles });
    } catch (err) {
        console.error('Error fetching news:', err);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

module.exports = {
    fetchNews
};