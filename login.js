var request = require('superagent');
var Promise = require('bluebird');
var agent = request.agent();
var program = require('commander');

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

module.exports = login;
