'use strict';

var zanoxAPI = require('../index');

describe('profile.editProfile', function() {

	it('Should get error not passing ProfileID', function(done) {
		zanoxAPI.profile.editProfile(null, {}).then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(1);
			done();
		});
	});

	it('Should get error not passing an integer as the ProfileID', function(done) {
		zanoxAPI.profile.editProfile('test', {}).then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(2);
			done();
		});
	});

	it('Should get error not passing profileObj', function(done) {
		zanoxAPI.profile.editProfile(123).then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(1);
			done();
		});
	});

	it('Should get error not passing an object as the profileObj', function(done) {
		zanoxAPI.profile.editProfile(123, null).then(function(result) {
			result.body.success.should.equal(false);
			result.body.code.should.equal(3);
			done();
		});
	});

});