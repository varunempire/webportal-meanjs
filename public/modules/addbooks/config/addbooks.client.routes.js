'use strict';

//Setting up route
angular.module('addbooks').config(['$stateProvider',
	function($stateProvider) {
		// Addbooks state routing
		$stateProvider.
		state('listAddbooks', {
			url: '/addbooks',
			templateUrl: 'modules/addbooks/views/list-addbooks.client.view.html'
		}).
		state('createAddbook', {
			url: '/addbooks/create',
			templateUrl: 'modules/addbooks/views/create-addbook.client.view.html'
		}).
		state('viewAddbook', {
			url: '/addbooks/:addbookId',
			templateUrl: 'modules/addbooks/views/view-addbook.client.view.html'
		}).
		state('editAddbook', {
			url: '/addbooks/:addbookId/edit',
			templateUrl: 'modules/addbooks/views/edit-addbook.client.view.html'
		});
	}
]);