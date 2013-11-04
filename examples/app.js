var express = require('express')
  , http = require('http')
  , middleware = require('../middleware');;

var app = express();

app.use(middleware.status());
app.use(middleware.logger());
app.use(middleware.allowCrossDomain());
app.use(middleware.signResponse('Twnel Inc.'));

http.createServer(app).listen(3000);

module.exports = app;
