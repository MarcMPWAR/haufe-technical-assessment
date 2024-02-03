const express = require('express');
const axios = require('axios');
const Episode = require('../models/Episode');

const router = express.Router();

const updateEpisodesFromAPI = async () => {
  try {
    // Fetch episodes from the external API
    const response = await axios.get('https://rickandmortyapi.com/api/episode');
    const apiEpisodes = response.data.results;

    const updatedEpisodes = [];

    // Loop through episodes from the API and update or insert each one
    for (const apiEpisode of apiEpisodes) {
      const existingEpisode = await Episode.findOne({ id: apiEpisode.id });

      if (existingEpisode) {
        // Update existing episode in the database
        await Episode.updateOne({ id: apiEpisode.id }, apiEpisode);
        updatedEpisodes.push(apiEpisode);
      } else {
        // Insert new episode into the database
        const newEpisode = await Episode.create(apiEpisode);
        updatedEpisodes.push(newEpisode);
      }
    }

    console.log('Episodes updated/inserted successfully.');
  } catch (error) {
    console.error('Error fetching/updating episodes:', error.message);
  }
};

router.get('/update-episodes', async (req, res) => {
  await updateEpisodesFromAPI();
  res.json({ message: 'Episodes updated/inserted successfully.' });
});

// Endpoint to get all episodes from the database
router.get('/episodes', async (req, res) => {
  try {
    const episodes = await Episode.find();
    res.json({ episodes });
  } catch (error) {
    console.error('Error fetching episodes from the database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Fetch episodes by IDs
router.get('/episode/:id', async (req, res) => {
  const episodeIds = req.params.id.split(',').map(id => parseInt(id.trim()));

  try {
    // Find episodes in the database by IDs
    const episodes = await Episode.find({ id: { $in: episodeIds } });

    if (!episodes || episodes.length === 0) {
      return res.status(404).json({ error: 'Episodes not found' });
    }

    res.json(episodes);
  } catch (error) {
    console.error('Error fetching episode details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Filter episodes based on query parameters
router.get('/episodes/filter', async (req, res) => {
  try {
    // Apply filters if provided in query parameters
    let queryFilters = {};
    const filters = ['name', 'episode'];

    filters.forEach((filter) => {
      if (req.query[filter]) {
        // Use regular expression for case-insensitive partial match
        queryFilters[filter] = new RegExp(req.query[filter], 'i');
      }
    });

    // Find episodes in the database based on filters
    const filteredEpisodes = await Episode.find(queryFilters);

    res.json(filteredEpisodes);
  } catch (error) {
    console.error('Error fetching filtered episodes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = { router, updateEpisodesFromAPI };