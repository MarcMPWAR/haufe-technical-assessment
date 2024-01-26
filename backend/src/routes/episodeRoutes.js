const express = require('express');
const axios = require('axios');
const Episode = require('../models/Episode');

const router = express.Router();

// Fetch and save episodes from the Rick and Morty API
router.get('/episodes', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/episode');
    const episodes = response.data.results;

    // Save episodes to the database
    await Episode.insertMany(episodes);

    res.json(episodes);
  } catch (error) {
    console.error('Error fetching episodes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;