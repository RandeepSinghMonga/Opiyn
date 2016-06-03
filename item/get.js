'use strict';

var self = get;
module.exports = self;
var itemsModel = require('./Model.js');

function get(req, res) {
  console.log("Inside get");
  var query = itemsModel.find({});
  query.sort({'counters.reviews': -1});
  // query.limit(req.params.pg);
  query.exec(function (err, items) {
    res.send(items);
  });
}