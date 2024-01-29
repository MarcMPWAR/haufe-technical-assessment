const express = require('express');
const axios = require('axios');
const Character = require('../models/Character');

const router = express.Router();

// Fetch and save characters from the Rick and Morty API
router.get('/characters', async (req, res) => {
  try {
    // Fetch characters from the external API
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const apiCharacters = response.data.results;

    const updatedCharacters = [];

    // Loop through characters from the API and update or insert each one
    for (const apiCharacter of apiCharacters) {
      const existingCharacter = await Character.findOne({ id: apiCharacter.id });

      if (existingCharacter) {
        // Update existing character in the database
        await Character.updateOne({ id: apiCharacter.id }, apiCharacter);
        updatedCharacters.push(apiCharacter);
      } else {
        // Insert new character into the database
        const newCharacter = await Character.create(apiCharacter);
        updatedCharacters.push(newCharacter);
      }
    }

    res.json({ message: 'Characters updated/inserted successfully.', updatedCharacters });
  } catch (error) {
    console.error('Error fetching/updating characters:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/character/:id', async (req, res) => {
  const characterIds = req.params.id.split(',').map(id => parseInt(id.trim()));

  try {
    // Find characters in the database by IDs
    const characters = await Character.find({ id: { $in: characterIds } });

    if (!characters || characters.length === 0) {
      return res.status(404).json({ error: 'Characters not found' });
    }

    res.json(characters);
  } catch (error) {
    console.error('Error fetching character details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Filter characters based on query parameters
router.get('/characters/filter', async (req, res) => {
  try {
    // Apply filters if provided in query parameters
    let queryFilters = {};
    const filters = ['name', 'status', 'species', 'type', 'gender'];

    filters.forEach((filter) => {
      if (req.query[filter]) {
        // Use regular expression for case-insensitive partial match
        queryFilters[filter] = new RegExp(req.query[filter], 'i');
      }
    });

    // Find characters in the database based on filters
    const filteredCharacters = await Character.find(queryFilters);

    res.json(filteredCharacters);
  } catch (error) {
    console.error('Error fetching filtered characters:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;