var request = require('superagent');

var agent = request.agent();
agent.post('https://www.vocabulary.com/login/')
.type('form')
.send({
  username: 'hoangtrieukhang@gmail.com',
  password: '123#@!MinhKhang'
})
.end(function(err, res) {
  agent.post("http://www.vocabulary.com/lists/save.json")
  .set({
    'Host': 'www.vocabulary.com',
    'Origin': 'http://www.vocabulary.com',
    'Referer': 'http://www.vocabulary.com/dictionary/book'
  })
  .type('form')
  .send({
    addwords: '[{"word":"devil","lang":"en"}]',
    id: '619560'
  })
  .end(function(err, res) {
    console.log(err, res.text);
  });
});
