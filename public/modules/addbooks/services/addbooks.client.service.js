'use strict';

//Addbooks service used to communicate Addbooks REST endpoints
angular.module('addbooks').factory('Addbooks', ['$resource',
	function($resource) {
		return $resource('addbooks/:addbookId', { addbookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);