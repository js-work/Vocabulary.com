var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

var filePath = path.resolve(__dirname, './defaults.json');

function getDefaultValues() {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if(err) {
        reject(err);
      }

      if(!data) {
        reject(new Error('No defaults.json is found!!!'));
      }

      resolve(JSON.parse(data));
    });
  });
}

module.exports = getDefaultValues;
