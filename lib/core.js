'use strict';

var crypto = require('crypto'),
	hat = require('hat'),
	request = require('request-promise'),
	querystring = require('querystring'),
zanoxAPI = {

	errorObj: require('./error.json'),

	zanoxUrl: 'http://api.zanox.com/json/2011-03-01',
	connectId: '',
	secretKey: '',

	init: function(id, secret) {
		if(!id || !secret) {
			return zanoxAPI.errorHandler('main', 2);
		}

		zanoxAPI.connectId = id;
		zanoxAPI.secretKey = secret;

		return zanoxAPI;
	},

	createHeader: function(method, uri) {
		var thisTimestamp = new Date().toUTCString(),
			thisNonce = hat(80),
			signature = zanoxAPI.createSignature(method, uri, thisTimestamp, thisNonce),
			authorization = 'ZXWS ' + zanoxAPI.connectId + ':' + signature;

		return {
			'Date': thisTimestamp,
			'Nonce': thisNonce,
			'Authorization': authorization
		};
	},

	createSignature: function(method, uri, thisTimestamp, thisNonce) {
		var signature = method + uri + thisTimestamp + thisNonce,
			hmac = crypto.createHmac('sha1', zanoxAPI.secretKey);

		hmac.update(signature);
		return hmac.digest('base64');
	},

	parseBody: function(body, response) {
		if (response.headers['content-type'] !== 'application/json') {
			return JSON.parse(body);
		}

		return body;
	},

	errorHandler: function(section, code, err) {
		var returnedError = { success: false },
			message = 'Error Unknow';

		if(zanoxAPI.errorObj[section][code]) {
			message = zanoxAPI.errorObj[section][code];
		}

		returnedError.code = code;
		returnedError.message = message;

		if(err) {
			err.response = err.response.body;
			returnedError.err = err;
		}

		console.error(returnedError);
		throw new Error(returnedError.message);
	},

	makeCall: function(method, uri, params) {
		if(!zanoxAPI.connectId || !zanoxAPI.secretKey) {
			return zanoxAPI.errorHandler('main', 1);
		}

		var headers = zanoxAPI.createHeader(method, uri),
			querystringParsed = '';

		if (params) {
			querystringParsed = '?' + querystring.stringify(params);
		}

		return request({
			method: method,
			uri: zanoxAPI.zanoxUrl + uri + querystringParsed,
			headers: headers,
			transform: zanoxAPI.parseBody
		}).catch(function(err) {
			return zanoxAPI.errorHandler('main', 0, err);
		});
	}

};

module.exports = Object.create(zanoxAPI);