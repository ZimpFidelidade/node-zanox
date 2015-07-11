'use strict';

var zanoxAPI = require('./core'),
adspaceAPI = {

	/* https://developer.zanox.com/web/guest/publisher-api-2011/get-adspaces */
	getAdSpaces: function() {
		return zanoxAPI.makeCall('GET', 'adspaces');
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/get-adspaces-adspace */
	getAdSpaceById: function(adSpaceId) {
		if(!adSpaceId || /^\d+$/.test(adSpaceId) === false) {
			return zanoxAPI.errorHandler('adspace', 1);
		}

		return zanoxAPI.makeCall('GET', 'adspaces/adspace/' + adSpaceId);
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/delete-adspaces-adspace */
	deleteAdSpace: function(adSpaceId) {
		if(!adSpaceId || /^\d+$/.test(adSpaceId) === false) {
			return zanoxAPI.errorHandler('adspace', 1);
		}

		return zanoxAPI.makeCall('DELETE', 'adspaces/adspace/' + adSpaceId);
	}

};

module.exports = Object.create(adspaceAPI);