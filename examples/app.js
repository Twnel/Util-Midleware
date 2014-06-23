var express = require('express')
  , http = require('http')
  , middleware = require('../lib/middleware');;

var app = express();
var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'colorize':true});

app.use(middleware.status('/example/'));
app.use(middleware.allowCrossDomain());
app.use(middleware.logger(process.env.NODE_ENV, winston));
app.use(middleware.signResponse('Twnel Inc.'));

app.get('/test', function(req, res, next){
  res.send(200);
});

http.createServer(app).listen(3000);

module.exports = app;
