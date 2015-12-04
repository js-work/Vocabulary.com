var fs = require('fs');
var agent = require('./agent');
var path = require('path');
var Promise = require('bluebird');
var program = require('commander');
var readline = require('readline');

// readline
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// parsing program paramaters
program
.parse(process.argv);

/**
 * writeFile
 *
 * @param cert
 * @return {void}
 */
function writeFile(cert) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path.resolve(__dirname, './secret.json'),
                 JSON.stringify(cert),
                 function(err) {
                   if (err) reject(err);
                   resolve();
                 });
  })
};

/**
 * _question ask the client with hidden text
 *
 * @param question
 * @return {Promise}
 */
function _hidden(question) {
  return new Promise(function(resolve, reject) {
    var stdin = process.openStdin();
    process.stdin.on("data", function(char) {
      char = char + "";
      switch (char) {
        case "\n":
          case "\r":
          case "\u0004":
          stdin.pause();
        break;
        default:
          process.stdout.write("\033[2K\033[200D" + question);
        break;
      }
    });

    rl.question(question, function(value) {
      rl.history = rl.history.slice(1);
      resolve(value);
    });
  });
}

/**
 * _question ask the client with clear text
 *
 * @param question
 * @return {Promise}
 */
function _question(question) {
  return new Promise(function(resolve, reject) {
    rl.question(question, function(answer) {
      resolve(answer);
    });
  });
};

(function() {
  var cert = {
    username: '',
    password: ''
  };

  _question('Username: ')
  .then(function(username) {
    cert.username = username;
    return _hidden('Password: ');
  })
  .then(function(password) {
    cert.password = password;
    return writeFile(cert);
  })
  .then(function(username) {
    console.log('Saved');
    process.exit(1);
  });

})();
