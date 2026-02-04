const express = require('express');
const { resolve } = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoSanitize = require('./middlewares/sanitizeQueries.js');

const app = express();
const port = 3010;

//Routes
const userRoutes = require('./routes/user/userRoutes.js');

app.use(express.static('static'));
app.use(mongoSanitize);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    app.use('/api/users', userRoutes);
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
