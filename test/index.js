var sinon = require('sinon');
var expect = require('chai').expect;

var getDefaultValues = require('../loadDefaultValues');

describe('Load default values', function() {
    it('should raise error when there is no default values', function(done) {
        getDefaultValues('./the-file-that-doesnt-exist.js')
        .catch(function(e) {
            expect(e).to.be.not.null;
            done();
        });
    });

    it('should load successfully', function(done) {
        getDefaultValues('./test/defaults-test.js')
        .then(function(defaultValues) {
            expect(defaultValues.foo).to.equal('bar');
            done();
        })
    });

    it('should raise error when loading malformed data', function(done) {
        getDefaultValues('./test/malformed-data.test.js')
        .catch(function(e) {
            expect(e.message).to.equal('Default values is malformed');
            done();
        })
    });
});

describe('Adding word', function() {
});

describe('Login', function() {
});
