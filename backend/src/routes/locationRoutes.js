const express = require('express');
const axios = require('axios');
const Episode = require('../models/Episode');
const Location = require('../models/Location');

const router = express.Router();

// Fetch and save locations from the Rick and Morty API
router.get('/locations', async (req, res) => {
  try {
    // Fetch locations from the external API
    const response = await axios.get('https://rickandmortyapi.com/api/location');
    const apiLocations = response.data.results;

    const updatedLocations = [];

    // Loop through locations from the API and update or insert each one
    for (const apiLocation of apiLocations) {
      const existingLocation = await Location.findOne({ id: apiLocation.id });

      if (existingLocation) {
        // Update existing location in the database
        await Location.updateOne({ id: apiLocation.id }, apiLocation);
        updatedLocations.push(apiLocation);
      } else {
        // Insert new location into the database
        const newLocation = await Location.create(apiLocation);
        updatedLocations.push(newLocation);
      }
    }

    res.json({ message: 'Locations updated/inserted successfully.', updatedLocations });
  } catch (error) {
    console.error('Error fetching/updating locations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch locations by IDs
router.get('/location/:id', async (req, res) => {
  const locationIds = req.params.id.split(',').map(id => parseInt(id.trim()));

  try {
    // Find locations in the database by IDs
    const locations = await Location.find({ id: { $in: locationIds } });

    if (!locations || locations.length === 0) {
      return res.status(404).json({ error: 'Locations not found' });
    }

    res.json(locations);
  } catch (error) {
    console.error('Error fetching location details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Filter locations based on query parameters
router.get('/locations/filter', async (req, res) => {
  try {
    // Apply filters if provided in query parameters
    let queryFilters = {};
    const filters = ['name', 'type', 'dimension'];

    filters.forEach((filter) => {
      if (req.query[filter]) {
        // Use regular expression for case-insensitive partial match
        queryFilters[filter] = new RegExp(req.query[filter], 'i');
      }
    });

    // Find locations in the database based on filters
    const filteredLocations = await Location.find(queryFilters);

    res.json(filteredLocations);
  } catch (error) {
    console.error('Error fetching filtered locations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
