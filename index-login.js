var fs = require('fs');
var agent = require('./agent');
var path = require('path');
var Promise = require('bluebird');
var program = require('commander');

program
.parse(process.argv);

function writeFile(cert) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.resolve(__dirname, './secret.json'),
                 JSON.stringify(cert),
                 function(err) {
                   if (err) reject(err);
                   resolve();
                 });
  })
}

(function() {
  var cert = {
    username: program.args[0],
    password: program.args[1]
  };

  writeFile(cert)
  .then(function() {
    console.log('Done');
  })
})();
