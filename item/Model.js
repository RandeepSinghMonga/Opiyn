'use strict';

var mongoose = require('mongoose');
var itemsModel = mongoose.model('Item', require('./Schema.js'));

module.exports = itemsModel;
