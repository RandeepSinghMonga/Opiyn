'use strict';

var mongoose = require('mongoose');

var items = new mongoose.Schema({
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    counters: {
      reviews: {type: Number, default: 0, required: true},
    },
    createdAt: {type: Date}
  },
  {collection: 'items'});

module.exports = items;
items.index({title: 1}, {unique: true});

items.set('toJSON', {
  getters: true,
  transform: function (doc, ret) {
    delete ret._id;
  }
});