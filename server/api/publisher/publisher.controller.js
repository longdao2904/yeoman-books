'use strict';

var _ = require('lodash');
var Publisher = require('./publisher.model');

// Get list of publishers
exports.index = function (req, res) {
  Publisher.find(function (err, publishers) {
    if (err) { return handleError(res, err); }
    return res.json(200, { value: publishers });
  });
};

// Get a single publisher
exports.show = function (req, res) {
  Publisher.findById(req.params.id, function (err, publisher) {
    if (err) { return handleError(res, err); }
    if (!publisher) { return res.send(404); }
    return res.json(publisher);
  });
};

// Creates a new publisher in the DB.
exports.create = function (req, res) {
  Publisher.create(req.body, function (err, publisher) {
    if (err) { return handleError(res, err); }
    return res.json(201, publisher);
  });
};

// Updates an existing publisher in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Publisher.findById(req.params.id, function (err, publisher) {
    if (err) { return handleError(res, err); }
    if (!publisher) { return res.send(404); }
    var updated = _.merge(publisher, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, publisher);
    });
  });
};

// Deletes a publisher from the DB.
exports.destroy = function (req, res) {
  Publisher.findById(req.params.id, function (err, publisher) {
    if (err) { return handleError(res, err); }
    if (!publisher) { return res.send(404); }
    publisher.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}