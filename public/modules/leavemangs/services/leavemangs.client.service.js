'use strict';

//Leavemangs service used to communicate Leavemangs REST endpoints
angular.module('leavemangs').factory('Leavemangs', ['$resource',
	function($resource) {
		return $resource('leavemangs/:leavemangId', { leavemangId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);