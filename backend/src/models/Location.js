const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  dimension: String,
  residents: [{
    type: String,
  }],
  url: String,
  created: String,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
