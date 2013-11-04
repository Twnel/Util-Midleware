## Express/Connect util Middleware

Small common methods commonly used for exposed APIs


### Current Features

*status:* Respond 200 at the /status url and wont write to logs
*logger:* Write logs depending on the enviroment
*allowCrossDomain:* Allow Cross Domain Requests
*signResponse:* Adds the 'Built-By' Header with the value passed

### Usage

npm install util-express-middleware

_app.js_

var express = require('express')
  , http = require('http')
  , middleware = require('util-express-middleware')

var app = express();

app.use(middleware.status());
app.use(middleware.allowCrossDomain());
app.use(middleware.logger(process.env.NODE_ENV));
app.use(middleware.signResponse('Twnel Inc.'));

http.createServer(app).listen(3000);;
 
