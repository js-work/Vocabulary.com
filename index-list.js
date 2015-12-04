var Promise = require('bluebird');
var agent = require('./agent');
var fs = require('fs');
var path = require('path');
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

function login(username, password) {
  return new Promise(function(resolve, reject) {
    agent.post('https://www.vocabulary.com/login/')
    .type('form')
    .send({
      username: username,
      password: password
    })
    .end(function(err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

function getCertificate() {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve('./secret.json'), 'utf8', function(err, data) {
      if(err) {
        reject(err);
      }

      resolve(JSON.parse(data));
    });
  });
}

(function listAll() {
  getCertificate()
  .then(function(cert) {
    return login(cert.username, cert.password);
  })
  .then(list(619560))
  .then(function(res) {
    console.log(JSON.parse(res.text).result);
  })
  .catch(console.log.bind(console));
})();
