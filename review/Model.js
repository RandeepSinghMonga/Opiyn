'use strict';

var mongoose = require('mongoose');
var reviewModel = mongoose.model('Review', require('./Schema.js'));

module.exports = reviewModel;
