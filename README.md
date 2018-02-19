## Express/Connect util Middleware

Small common methods commonly used for exposed APIs

### Current Features

* **status:** Respond 200 at the /status url and wont write to logs
* **logger:** Write logs depending on the enviroment
* **allowCrossDomain:** Allow Cross Domain Requests
* **signResponse:** Adds the 'Built-By' Header with the value passed

### Getting Started

To dowload and install the library, issue the following command `npm install https://github.com/Twnel/Util-Midleware/tarball/master`

### Deployment
At your express app principal file example "app.js" you need to require the library as shown, and indicate to express to express that it should use it as middleware.
```
  var express = require('express')
    , http = require('http')
    , middleware = require('util-express-middleware')

  var app = express();

  app.use(middleware.status());
  app.use(middleware.allowCrossDomain());
  app.use(middleware.logger(process.env.NODE_ENV));
  app.use(middleware.signResponse('Twnel Inc.'));

  http.createServer(app).listen(3000);
  ```
 
### Running the tests

To run the tests, use `npm run test`

### Built With

* [Redis](https://redis.io/) - in memory database
* [Express](https://expressjs.com/) - web app framework
* [Winston](https://github.com/winstonjs/winston) - logger

## Authors

* **David Roncancio** - *Initial work*
* **Jonathan Valencia**

See also the list of [contributors](https://github.com/Twnel/Util-Midleware/graphs/contributors) who participated in this project.
