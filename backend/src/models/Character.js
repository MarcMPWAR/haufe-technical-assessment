const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  id: Number,
  name: String,
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
  created: String
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;