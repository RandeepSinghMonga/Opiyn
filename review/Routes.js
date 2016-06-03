'use strict';

module.exports = reviewRoutes;

function reviewRoutes(app) {
  app.get('/item/:Id', require('./getById.js'));

}
