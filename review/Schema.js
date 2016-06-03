'use strict';

var mongoose = require('mongoose');

var review = new mongoose.Schema({
    itemId: {type: String, required: true},
    content : {type: String, required: true},
    createdAt: {type: Date}
  },
  {collection: 'review'});

module.exports = review;
review.index({title: 1}, {unique: true});

review.set('toJSON', {
  getters: true,

  transform: function (doc, ret) {
    delete ret._id;
  }
});
