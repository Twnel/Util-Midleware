var redis = require('redis');

/**
 * Validate an API key and or an API Token, from one or many passed
 * {
 *  redisClient: 'your own redis client', // (optional default tries to connect locally)
 *  fixedKey: 'A fixed key that will be checked under the API-Key header or query param', // optional
 *  fixedToken: 'A fixed key that will be checked under the API-Token header or query param', // optional
 *  hashSet: 'A hash set (hset) name from redis where you will find the key and the token it will look on redis for that pair' default to api:keys
 *  keyName: 'The name of the api key default API-Key or api-key'
 *  tokenName: 'The name of the api token default API-Token or api-token'
 * }
 */
exports.validateKey = function(opts) {
  var cache = opts.redisClient || redis.createClient();
  return function(req, res, next) {

    var requestKey = req.headers['API-Key'] || req.headers['api-key'] || req.query['API-Key'] || req.headers[opts.keyName] || req.query[opts.keyName];
    var requestToken = req.headers['API-Token'] || req.headers['api-token'] || req.query['API-Token'] || req.headers[opts.tokenName] || req.query[opts.tokenName];

    if (!requestKey) {
      return res.sendStatus(401);
    }

    if (requestKey && opts.fixedKey && !opts.fixedToken && requestKey === opts.fixedKey) {
      next();
    }

    if (requestKey && requestToken) {
      if (requestKey === opts.fixedKey && requestToken === opts.fixedToken) {
        next();
      } else {
        cache.hget(opts.hashSet || 'api:keys', requestKey, function(error, storedToken) {
          if (error || !storedToken || storedToken !== requestToken) {
            return res.sendStatus(401);
          } else {
            next();
          }
        });
      }
    } else {
      return res.sendStatus(401);
    }
  }
}

/**
 * Prevent too many requests for a any resource 
 */
exports.throttling = function(opts) {
  var cache = redis.createClient() || opts.redisClient;
  return function(req, res, next) {
    var requester = req.headers['User-Id'] || req.query['User-Id'] || (req.session ? req.session.id : req.ip);

    cache.get('api:limit:' + requester, function(error, onQuotaReached) {
      if (!onQuotaReached) {

        cache.set('api:limit:' + requester, true);
        cache.expire('api:limit:' + requester, opts.limit || 5000);

      }
    });
  }
}