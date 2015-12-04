var Promise = require('bluebird');
var agent = require('./agent');
var fs = require('fs');
var path = require('path');
var login = require('./login');
var program = require('commander');

function list(listID) {
  return function() {
    return new Promise(function(resolve, reject) {
      agent.post('https://www.vocabulary.com/lists/load.json')
      .type('form')
      .send({
        id: listID
      })
      .end(function(err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}

(function listAll() {
  login()
  .then(list(619560))
  .then(function(res) {
    console.log(JSON.parse(res.text).result);
  })
  .catch(console.log.bind(console));
})();
