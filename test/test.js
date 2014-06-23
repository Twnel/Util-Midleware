var supertest = require('supertest');
var app = require('../examples/app.js');

var request = supertest(app);

describe('Status', function(){

  it('Should answer OK', function(done){
    request.get('/example/status')
    .expect(200)
    .end(done);
  });


});

describe('Test', function(){

  it('Should answer OK', function(done){
    request.get('/test')
    .expect(200)
    .end(done);
  });


});
