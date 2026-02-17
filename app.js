const express = require('express');
const { resolve } = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoSanitize = require('./middlewares/sanitizeQueries.js');
const connectDB = require('./config/connectDB.js')

const app = express();
const port = 3010;
const cookieParser = require('cookie-parser')

//Routes
const userRoutes = require('./routes/user/userRoutes.js');
const playlistRoutes = require('./routes/playlist/playlistRoutes.js')
const artistRoutes = require('./routes/artist/artistRoutes.js')
const trackRoutes = require('./routes/track/trackRoutes.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static('static'));
app.use(mongoSanitize);


app.use('/', userRoutes);
app.use('/', playlistRoutes)
app.use('/', artistRoutes)
app.use('/', trackRoutes)
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

module.exports = app