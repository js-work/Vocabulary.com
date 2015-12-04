var fs = require('fs');
var agent = require('./agent');
var path = require('path');
var Promise = require('bluebird');
var program = require('commander');

program
.parse(process.argv);

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

function writeFile(cert) {
  return function() {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path.resolve(__dirname, './secret.json'),
                   JSON.stringify(cert),
                   function(err) {
                     if (err) reject(err);
                     resolve();
                   });
    })
  }
}

(function() {
  var cert = {
    username: program.args[0],
    password: program.args[1]
  };

  login(cert.username, cert.password)
  .then(writeFile(cert))
  .then(function() {
    console.log('Done');
  })
})();
