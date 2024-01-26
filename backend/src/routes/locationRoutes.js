const express = require('express');
const axios = require('axios');
const Location = require('../models/Location');

const router = express.Router();

// Fetch and save locations from the Rick and Morty API
router.get('/locations', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/location');
    const locations = response.data.results;

    // Save locations to the database
    await Location.insertMany(locations);

    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;