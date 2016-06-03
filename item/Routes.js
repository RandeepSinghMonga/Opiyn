'use strict';

module.exports = itemsRoutes;

function itemsRoutes(app) {
  app.get('/item/get', require('./get.js'))
}
