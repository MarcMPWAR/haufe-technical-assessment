const express = require('express');
const axios = require('axios');
const Character = require('../models/Character');

const router = express.Router();

// Fetch and save characters from the Rick and Morty API
router.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results;

    // Save characters to the database
    await Character.insertMany(characters);

    res.json(characters);
  } catch (error) {
    console.error('Error fetching characters:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;