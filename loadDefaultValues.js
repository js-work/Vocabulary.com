var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');

function getDefaultValues(pathString) {
    pathString = pathString || './defaults.json';
    var filePath = path.resolve(__dirname, pathString);

    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if(err) {
                reject(err);
            }

            if(!data) {
                reject(new Error('No defaults.json is found!!!'));
            }

            try {
                var content = JSON.parse(data);
            } catch (e) {
                var error = new Error('Default values is malformed');
            }

            if (error) {
                reject(error);
            }

            resolve(content);
        });
    });
}

module.exports = getDefaultValues;
