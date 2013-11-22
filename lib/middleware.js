var express = require('express');

/**
 * 200 Status Middleware 
 */
exports.status = function(){
  return function(req, res, next){
    if(req.url === '/status'){
      res.send(200);
      res.end();
    }else{
      next();
    }
  }
}

/**
 * Environment Wise Logger
 */
exports.logger = function(env){
  var logger = {

    development: express.logger('dev'),

    test: function(req, res, next){
      next();
    },

    production: express.logger()
  };
  return logger[env || 'development'];
}

/**
 * CORS enabler
 */
exports.allowCrossDomain = function(){
  return function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  };
}

/**
 * Sign the request with your company name
 */
exports.signResponse = function(companyName){
  return function(req, res, next) {
    res.header('Built-By', companyName);
    res.header('access-control-allow-headers', res._headers['access-control-allow-headers'] += ', Built-By');
    next();
  };
}