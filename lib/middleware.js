var express = require('express');
var winston = require('winston');
var self = this;

/**
 * 200 Status Middleware
 */
exports.status = function(middleware) {
  return function(req, res, next) {
    var statusEndpoint = middleware ? middleware : '/';
    statusEndpoint += 'status';
    if (req.url === statusEndpoint) {
      return res.sendStatus(200);
    } else {
      next();
    }
  }
}

/**
 * Environment Wise Logger
 */
exports.logger = function(env, logManager) {
  logManager = logManager || winston;

  var logStream = {
    write: function(message, encoding) {
      logManager.info(message);
    }
  };

  var logger = {

    development: express.logger('dev'),

    test: function(req, res, next) {
      next();
    },

    production: function(req, res, next) {
      if (!req.url.match(/.css|.png|.jpg|.js|.gif|.tiff|.woff/g)) {
        express.logger({
          stream: logStream
        })(req, res, next);
      } else {
        next();
      }
    }
  };
  return (logger[env] || logger['development']);
}


/**
 * CORS enabler
 */
exports.allowCrossDomain = function() {
  return function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, twnel-app-key, twnel-app-token, apikey, apitoken, worldwide, requester, company');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
    } else {
      next();
    }
  };
}

/**
 * Error and Exception Logging Handling this should be put last
 */
exports.errorLogger = function(winston) {
  return function errorReport(err, req, res, next) {
    if (err instanceof SyntaxError) {
      return res.send(400, {
        error: err.toString()
      });
    }
    var content = err.stack + '\n\n';
    content += 'METHOD: ' + req.method + '\n';
    content += 'PATH: ' + req.path + '\n';
    content += 'PARAMS: ' + req.params + '\n';
    content += 'QUERY: ' + req.originalUrl + '\n';
    content += 'IP: ' + req.ip + '\n';
    content += 'HEADERS: ' + JSON.stringify(req.headers) + '\n';
    content += 'BODY: ' + JSON.stringify(req.body) + '\n';
    return res.send(500, content);
  };
}

/**
 * Sign the request with your company name
 */
exports.signResponse = function(companyName) {
  return function(req, res, next) {
    res.header('Built-By', companyName);
    res.header('access-control-allow-headers', res._headers['access-control-allow-headers'] += ', Built-By');
    next();
  };
}