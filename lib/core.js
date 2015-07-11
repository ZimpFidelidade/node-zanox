'use strict';

var crypto = require('crypto'),
	hat = require('hat'),
	request = require('request-promise'),
	querystring = require('querystring'),
zanoxAPI = {

	errorObj: require('./error.json'),

	currentVersion: '2011-03-01',
	responseFormat: 'json',
	zanoxUrl: 'http://api.zanox.com/' + this.responseFormat + '/' + this.currentVersion + '/',
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

	createHeader: function(method, uri, thisTimestamp, thisNonce) {
		var signature = zanoxAPI.createSignature(method, uri, thisTimestamp, thisNonce),
			authorization = 'ZXWS ' + zanoxAPI.connectId + ':' + signature;

		return {
			'Date': thisTimestamp,
			'Nonce': thisNonce,
			'Authorization': authorization
		};
	},

	createSignature: function(method, uri) {
		var thisTimestamp = new Date().toUTCString(),
			thisNonce = hat(80),
			signature = method + uri + thisTimestamp + thisNonce,
			hmac = crypto.createHmac('sha1', zanoxAPI.secretKey, thisTimestamp, thisNonce);

		hmac.update(signature);
		return hmac.digest('base64');
	},

	parseBody: function(body, response) {
		if (response.headers['content-type'] === 'application/json') {
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
			returnedError.err = err;
		}

		return returnedError;
	},

	makeRequest: function(method, uri, params) {
		if(!zanoxAPI.connectId || !zanoxAPI.secretKey) {
			return zanoxAPI.errorHandler('main', 1);
		}

		var headers = zanoxAPI.createHeader(method, uri),
			querystring;

		if (params) {
			querystring = '?' + querystring.stringify(params);
		}

		return request({
			method: method,
			uri: zanoxAPI.zanoxUrl + uri + querystring,
			headers: headers,
			transform: zanoxAPI.parseBody
		}).catch(function(err) {
			return zanoxAPI.errorHandler('main', 0, err);
		});
	}

};

module.exports = Object.create(zanoxAPI);