'use strict';
var middleware = require('./lib/middleware');
var security = require('./lib/security');

middleware.validateKey = security.validateKey;
middleware.throttling = security.throttling;

module.exports = middleware;