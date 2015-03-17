'use strict';

//Placements service used to communicate Placements REST endpoints
angular.module('placements').factory('Placements', ['$resource',
	function($resource) {
		return $resource('placements/:placementId', { placementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);