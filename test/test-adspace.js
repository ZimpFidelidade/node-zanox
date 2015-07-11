/*  */

'use strict';

var zanoxAPI = require('../index.js');

describe('adspace.getAdSpaceById', function() {

	it('Should get error not passing AdpsaceID', function(done) {
		zanoxAPI.adspace.getAdSpaceById(null).then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(1);
			done();
		});
	});

	it('Should get error not passing an integer as the AdpsaceID', function(done) {
		zanoxAPI.profile.getAdSpaceById('test').then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(1);
			done();
		});
	});

});

describe('adspace.deleteAdSpace', function() {

	it('Should get error not passing AdpsaceID', function(done) {
		zanoxAPI.adspace.deleteAdSpace(null).then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(1);
			done();
		});
	});

	it('Should get error not passing an integer as the AdpsaceID', function(done) {
		zanoxAPI.profile.deleteAdSpace('test').then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(1);
			done();
		});
	});

});