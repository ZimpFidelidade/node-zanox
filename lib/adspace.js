'use strict';

var zanoxAPI, adspaceAPI = {

	init: function(core) {
		zanoxAPI = core;
		return adspaceAPI;
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/get-adspaces */
	getAdSpaces: function() {
		return zanoxAPI.makeCall('GET', '/adspaces').then(function(result) {
			result.adspaceItems = result.adspaceItems.adspaceItem;
			return result;
		});
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/get-adspaces-adspace */
	getAdSpaceById: function(adSpaceId) {
		if(!adSpaceId || /^\d+$/.test(adSpaceId) === false) {
			return zanoxAPI.errorHandler('adspace', 1);
		}

		return zanoxAPI.makeCall('GET', '/adspaces/adspace/' + adSpaceId).then(function(result) {
			return result.adspaceItem[0];
		});
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/delete-adspaces-adspace */
	deleteAdSpace: function(adSpaceId) {
		if(!adSpaceId || /^\d+$/.test(adSpaceId) === false) {
			return zanoxAPI.errorHandler('adspace', 1);
		}

		return zanoxAPI.makeCall('DELETE', '/adspaces/adspace/' + adSpaceId);
	}

};

module.exports = adspaceAPI.init;