const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./services/db');
const { router: characterRoutes, updateCharactersFromAPI } = require('./routes/characterRoutes');
const episodeRoutes = require('./routes/episodeRoutes');
const locationRoutes = require('./routes/locationRoutes');
const authRoutes = require('./routes/authRoutes');
const passportConfig = require('./config/passport-config');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
connectDB();

// Initialize Passport.js
passportConfig();

// Use authentication routes
app.use('/api/auth', authRoutes);

// Call the routes
app.use('/api', characterRoutes);
app.use('/api', episodeRoutes);
app.use('/api', locationRoutes);

// Initialize characters when the application starts
updateCharactersFromAPI();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };