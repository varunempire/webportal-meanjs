'use strict';

//Addstudents service used to communicate Addstudents REST endpoints
angular.module('addstudents').factory('Addstudents', ['$resource',
	function($resource) {
		return $resource('addstudents/:addstudentId', { addstudentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);