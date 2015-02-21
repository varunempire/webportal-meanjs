'use strict';

//Setting up route
angular.module('addstudents').config(['$stateProvider',
	function($stateProvider) {
		// Addstudents state routing
		$stateProvider.
		state('listAddstudents', {
			url: '/addstudents',
			templateUrl: 'modules/addstudents/views/list-addstudents.client.view.html'
		}).
		state('createAddstudent', {
			url: '/addstudents/create',
			templateUrl: 'modules/addstudents/views/create-addstudent.client.view.html'
		}).
		state('viewAddstudent', {
			url: '/addstudents/:addstudentId',
			templateUrl: 'modules/addstudents/views/view-addstudent.client.view.html'
		}).
		state('editAddstudent', {
			url: '/addstudents/:addstudentId/edit',
			templateUrl: 'modules/addstudents/views/edit-addstudent.client.view.html'
		});
	}
]);