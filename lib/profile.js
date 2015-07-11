'use strict';

var zanoxAPI = require('./core'),
profileAPI = {

	/* https://developer.zanox.com/web/guest/publisher-api-2011/get-profiles */
	getProfile: function() {
		return zanoxAPI.makeCall('GET', 'profiles');
	},

	/* https://developer.zanox.com/web/guest/publisher-api-2011/put-profiles */
	editProfile: function(profileID, profileObj) {
		if(!profileID || !profileObj) {
			return zanoxAPI.errorHandler('profile', 1);
		}

		if(/^\d+$/.test(profileID) === false) {
			return zanoxAPI.errorHandler('profile', 2);
		}

		if(profileObj.toString() !== '[object Object]') {
			return zanoxAPI.errorHandler('profile', 3);
		}

		var profileXML = profileAPI.buildEditXML(profileID, profileObj);
		return zanoxAPI.makeCall('PUT', 'profiles', profileXML);
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

module.exports = Object.create(profileAPI);