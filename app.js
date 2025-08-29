const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require('./routes/userRoutes');
const prefrencesRouter = require('./routes/preferenceRoutes');
const newsRouter = require('./routes/newsRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users/preferences', prefrencesRouter);
app.use('/news', newsRouter);

app.use('/users', userRouter);

mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
module.exports = app;