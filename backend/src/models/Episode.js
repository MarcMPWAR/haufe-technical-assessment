const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  air_date: String,
  episode: {
    type: String,
    required: true,
  },
  characters: [{
    type: String,
  }],
  url: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
