const express = require('express');
const connectDB = require('./services/db');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Default route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
