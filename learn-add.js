var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var agent = require('./agent');
var program = require('commander');
var login = require('./login');
var spawn = require('child_process').spawn;

var getDefaultValues = require('./loadDefaultValues');

program
.parse(process.argv);

function addingWord(word) {
  var words = [{
    word: word,
    lang: 'en'
  }];

  // open browser with free dictionary
  spawn('open', ['https://www.thefreedictionary.com/' + word]);

  return function() {
    return new Promise(function(resolve, reject) {
        getDefaultValues()
        .then(function(defaultValues) {
            agent.post('https://www.vocabulary.com/lists/save.json')
            .type('form')
            .send({
                addwords: JSON.stringify(words),
                id: defaultValues.listID
            })
            .end(function(err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
        .catch(function(e) {
            console.log(e);
        })
    });
  }
}

(function() {
  var word = program.args[0];
  login()
  .then(addingWord(word))
  .then(function(res) {
      if(res.status === 200) {
          console.log(word +' have been save!');
      }
  })
  .catch(console.log.bind(console));
})();
