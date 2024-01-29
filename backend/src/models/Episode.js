const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  air_date: String,
  episode: String,
  characters: [{
    type: String,
  }],
  url: String,
  created: String,
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
