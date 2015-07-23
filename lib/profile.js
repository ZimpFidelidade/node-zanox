'use strict';

var zanoxAPI, profileAPI = {

	init: function(core) {
		zanoxAPI = core;
		return profileAPI;
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/get-profiles */
	getProfile: function() {
		return zanoxAPI.makeCall('GET', '/profiles').then(function(result) {
			return result.profileItem[0];
		});
	},

	buildEditXML: function(profileID, profileObj) {
		var permitedParams = [
			'firstName',
			'lastName',
			'email',
			'country',
			'street1',
			'city',
			'zipcode',
			'company',
			'street2',
			'phone',
			'mobile',
			'fax',
			'language',
			'currency',
			'title',
			'loginName',
			'userName',
			'isAdvertiser'
		],
		permitedObj = {},
		retunedXML;

		Object.getOwnPropertyNames(profileObj).forEach(function(el) {
			if(permitedParams.indexOf(el) > -1) {
				permitedObj[el] = profileObj[el];
			}
		});

		retunedXML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
		retunedXML += '<profileItem id="' + profileID + '" xmlns="http://api.zanox.com/namespace/2011-03-01/">';

		Object.getOwnPropertyNames(permitedObj).forEach(function(paramName) {
			retunedXML += '<' + paramName + '>';
			retunedXML += permitedObj[paramName];
			retunedXML += '</' + paramName + '>';
		});

		retunedXML += '</profileItem>';
		return retunedXML;
	}

};

module.exports = Object.create(profileAPI).init;