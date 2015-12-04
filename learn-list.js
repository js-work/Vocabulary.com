var Promise = require('bluebird');
var agent = require('./agent');
var fs = require('fs');
var path = require('path');
var login = require('./login');
var program = require('commander');

var filePath = path.resolve(__dirname, './defaults.json');

/**
 * writeFile
 *
 * @param data Object
 * @return {Promise}
 */
function writeFile(data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath,
                 JSON.stringify(data),
                 function(err) {
                   if (err) reject(err);
                   resolve();
                 });
  })
};

function getDefaultValues() {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if(err) {
        reject(err);
      }

      if(!data) {
        reject(new Error('No defaults.json is found!!!'));
      }

      console.log(data);
      resolve(JSON.parse(data));
    });
  });
}

program
.option('', 'List all the owner\'s lists')
.option('-d --default <listID>', 'Set default list')
.parse(process.argv);

function list(listID) {
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

(function listAll() {
  var defaultListID = program.default;

  // set default list
  if (defaultListID) {
    Promise.resolve()
    .then(function() {
      writeFile({listID: defaultListID});
    })
    .then(function() {
      console.log('Set');
    })
    .catch(console.log.bind(console))
  }

  // list all
  else {
    login()
    .then(getDefaultValues)
    .then(function(defaults) {
      return list(defaults.listID);
    })
    .then(function(res) {
      console.log(JSON.parse(res.text).result);
    })
    .catch(console.log.bind(console));
  }
})();
