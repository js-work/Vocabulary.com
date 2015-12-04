var request = require('superagent');
var Promise = require('bluebird');
var agent = request.agent();
var program = require('commander');

module.exports = agent;
