'use strict';

//Setting up route
angular.module('staffs').config(['$stateProvider',
	function($stateProvider) {
		// Staffs state routing
		$stateProvider.
		state('listStaffs', {
			url: '/staffs',
			templateUrl: 'modules/staffs/views/list-staffs.client.view.html'
		}).
		state('createStaff', {
			url: '/staffs/create',
			templateUrl: 'modules/staffs/views/create-staff.client.view.html'
		}).
		state('viewStaff', {
			url: '/staffs/:staffId',
			templateUrl: 'modules/staffs/views/view-staff.client.view.html'
		}).
		state('editStaff', {
			url: '/staffs/:staffId/edit',
			templateUrl: 'modules/staffs/views/edit-staff.client.view.html'
		});
	}
]);