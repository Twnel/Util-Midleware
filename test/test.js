var supertest = require('supertest');
var app = require('../examples/app.js');

var request = supertest(app);

describe('Status', function(){

  it('Should Create a job post', function(done){
    request.get('/status')
    .expect(200)
    .end(done);
  });

});