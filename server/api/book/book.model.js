'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: String,
  author: String,
  description: String,
  isbn: String,
  publishedDate: Date,
  numberOfPages: Number,
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'Publisher',
    index: true
  }
});

BookSchema.statics = {
  loadRecent: function (cb) {
    this.find({})
      .populate({ path: 'publisher', select: 'name' })
      .exec(cb);
  }
};

module.exports = mongoose.model('Book', BookSchema);