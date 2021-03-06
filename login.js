var Promise = require('bluebird');
var agent = require('./agent');
var fs = require('fs');
var path = require('path');
var program = require('commander');

function _login(username, password) {
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

function login() {
  return new Promise(function(resolve, reject) {
    getCertificate()
    .then(function(cert) {
      return _login(cert.username, cert.password);
    })
    .then(function(res) {
      resolve(res);
    })
    .catch(function(err) {
      // console.log(err);
      reject(err);
    });
  });
}

module.exports = login;
