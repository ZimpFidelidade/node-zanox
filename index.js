'use strict';

var core = require('./lib/core'),
	profile = require('./lib/profile'),
	adspace = require('./lib/adspace'),
	admedia = require('./lib/admedia');

module.exports = function(id, secret) {
	var zanoxCore = core.init(id, secret);

	this.adspace = adspace(zanoxCore);
	this.profile = profile(zanoxCore);
	this.admedia = admedia(zanoxCore);

	return this;
};