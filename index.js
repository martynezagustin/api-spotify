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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static('static'));
app.use(mongoSanitize);

async function startServer() {
  try {
    await connectDB()
    app.use('/', userRoutes);
    app.get('/', (req, res) => {
      res.sendFile(resolve(__dirname, 'pages/index.html'));
    });
    app.listen(port, () => {
      console.log(`🎧 API de Spotify corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar server:', error);
    process.exit(1);
  }
}

startServer();
