const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: String,
  dimension: String,
  residents: [{
    type: String,
  }],
  url: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
