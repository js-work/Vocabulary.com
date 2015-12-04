var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var agent = require('./agent');
var program = require('commander');
var login = require('./login');

program
.parse(process.argv);

function addingWord(word) {
  var words = [{
    word: word,
    lang: 'en'
  }];
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
        addwords: JSON.stringify(words),
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

(function() {
  var word = program.args[0];
  login()
  .then(addingWord(word))
  .then(function(res) {
    console.log(res.status);
  })
  .catch(console.log.bind(console));
})();
