const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    name: String,
    url: String,
  },
  location: {
    name: String,
    url: String,
  },
  image: String,
  episode: [{
    type: String,
  }],
  url: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;