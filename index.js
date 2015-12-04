#!/usr/bin/env node
var Promise = require('bluebird');
var agent = require('./agent');
var program = require('commander');

function addingWord(word) {
  return function() {
    return new Promise(function(resolve, reject) {
      agent.post('http://www.vocabulary.com/lists/save.json')
      .type('form')
      .set({
        'Host': 'www.vocabulary.com',
        'Origin': 'http://www.vocabulary.com',
        'Referer': 'http://www.vocabulary.com/dictionary/book'
      })
      .send({
        addwords: '[{"word":"notification","lang":"en"}]',
        id: '619560'
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

function addWord() {
  login('hoangtrieukhang@gmail.com', '123#@!MinhKhang')
  .then(addingWord('something'))
  .then(function(res) {
    console.log(res.status);
  })
  .catch(console.log.bind(console));
}

program
.version('0.0.2')
.command('hi [word]', 'add word to specific list')
.command('add <word>', 'add word to specific list')
.command('list', 'list add the list of yours')
.command('login <username> <password>', 'login')
.parse(process.argv);
