var sinon = require('sinon');
var expect = require('chai').expect;
var nock = require('nock');
var superagent = require('superagent');

var getDefaultValues = require('../loadDefaultValues');

describe('Load default values', function() {
    it('should raise error when there is no default values', function(done) {
        getDefaultValues('./test/data/the-file-that-doesnt-exist.js')
        .catch(function(e) {
            expect(e).to.be.not.null;
            done();
        });
    });

    it('should load successfully', function(done) {
        getDefaultValues('./test/data/defaults-test.js')
        .then(function(defaultValues) {
            expect(defaultValues.foo).to.equal('bar');
            done();
        })
    });

    it('should raise error when loading malformed data', function(done) {
        getDefaultValues('./test/data/malformed-data.test.js')
        .catch(function(e) {
            expect(e.message).to.equal('Default values is malformed');
            done();
        })
    });
});

describe('Adding word', function() {
});

describe('Login', function() {
    it('Login successfully', function(done) {
        nock('https://www.vocabulary.com')
        .get('/login')
        .reply(200, {foo: 'bar'})

        superagent.get('https://www.vocabulary.com/login')
        .end(function(err, res) {
            console.log(err, res.body);
            done();
        })
    })
});
