'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PublisherSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Publisher', PublisherSchema);