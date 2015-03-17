'use strict';

//Staffs service used to communicate Staffs REST endpoints
angular.module('staffs').factory('Staffs', ['$resource',
	function($resource) {
		return $resource('staffs/:staffId', { staffId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);