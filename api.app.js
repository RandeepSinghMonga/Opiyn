'use strict';

process.title = 'opiyn';
module.exports = createExpressApp;

var glob = require('glob');
var async = require('async');
var _ = require('underscore');
var express = require('express');
var mongoose = require('mongoose');

global.util = require('util');

if (require.main === module) {
  global.app = createExpressApp('mongodb://localhost:27017');
  module.exports = global.app;
}

function createExpressApp(mongoUrl) {
  try {
    var app = express();
    app.use(express.static(__dirname + '/public'));
    var mongoCallback = _onceMongoConnected.bind(null, app, mongoUrl);
    mongoose.connect(mongoUrl + '/dbName', {}, mongoCallback);
    return app;
  } catch (err) {
    _logErrorAndExit('Uncaught Exception thrown from createExpressApp.', err);
  }
}

function _onceMongoConnected(app, mongoUrl, err) {
  if (err) _logErrorAndExit('MongoDB connection error.', err);
  console.log('MongoDB: ' + mongoUrl + ' connected.');

  async.series([
      _requireRoutes.bind(null, app),
      _startListening.bind(null, app)
    ],
    function (err) {
      if (err)
        _logErrorAndExit(err.message, err);
    }
  );
}

function _requireRoutes(app, next) {
  console.log('Initializing routes');
  var bag = {
    app: app
  };
  async.series([
    glob.sync('./**/*Routes.js').forEach(_requireRoute.bind(null, app))
  ],
  function (err) {
    if (err)
      _logErrorAndExit(err.message, err);
  });
  return next();
}

function _startListening(app, next) {
  var apiPort = 5000;
  listen();
  function listen(error) {
    app.listen(apiPort, '0.0.0.0',
      _logServerListening.bind(null, apiPort, listen));
  }
}

function _requireRoute(app, routeFile) {
  require(routeFile)(app);
}

function _logErrorAndExit(message, err) {
  console.log(message);
  console.log(err);
  if (err.stack) console.log(err.stack);
  setTimeout(function () {
    process.exit();
  }, 3000);
}

function _logServerListening(port, listen, err) {
  var url = '0.0.0.0:' + port;
  if (err) return listen(err);
  console.log('API started on %s.', url);
}