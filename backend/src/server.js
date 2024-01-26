const express = require('express');
const connectDB = require('./services/db');
const characterRoutes = require('./routes/characterRoutes');
const episodeRoutes = require('./routes/episodeRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Call the routes
app.use('/api', characterRoutes);
app.use('/api', episodeRoutes);
app.use('/api', locationRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
