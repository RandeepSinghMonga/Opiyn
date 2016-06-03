'use strict';

var self = getById;
var async = require('async');
var reviewModel = require('./Model.js');

module.exports = self;

function getById(req, res) {
  console.log('Starting', "getById");
  var bag = {
    item: req.params.Id,
    resBody: {}
  };
  async.series([
      _getById.bind(bag)
    ],
    function (err) {
      console.log('Completed');
      if (err)
        return respondWithError(res, err);
      res.send(res, bag.resBody);
    }
  );
}

function _getById(bag, next) {
  console.log('Inside', bag.item);
  var query = reviewModel.find({});
  query.where('itemId', bag.item);
  query.sort({'createdAt': -1});
  query.limit(10);
  query.exec(function (err, review) {
    bag.resBody = review;
    return next();
  });
}
