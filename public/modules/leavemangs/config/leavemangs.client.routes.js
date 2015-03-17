'use strict';

//Setting up route
angular.module('leavemangs').config(['$stateProvider',
	function($stateProvider) {
		// Leavemangs state routing
		$stateProvider.
		state('listLeavemangs', {
			url: '/leavemangs',
			templateUrl: 'modules/leavemangs/views/list-leavemangs.client.view.html'
		}).
		state('createLeavemang', {
			url: '/leavemangs/create',
			templateUrl: 'modules/leavemangs/views/create-leavemang.client.view.html'
		}).
		state('viewLeavemang', {
			url: '/leavemangs/:leavemangId',
			templateUrl: 'modules/leavemangs/views/view-leavemang.client.view.html'
		}).
		state('editLeavemang', {
			url: '/leavemangs/:leavemangId/edit',
			templateUrl: 'modules/leavemangs/views/edit-leavemang.client.view.html'
		});
	}
]);