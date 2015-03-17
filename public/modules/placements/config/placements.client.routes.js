'use strict';

//Setting up route
angular.module('placements').config(['$stateProvider',
	function($stateProvider) {
		// Placements state routing
		$stateProvider.
		state('listPlacements', {
			url: '/placements',
			templateUrl: 'modules/placements/views/list-placements.client.view.html'
		}).
		state('createPlacement', {
			url: '/placements/create',
			templateUrl: 'modules/placements/views/create-placement.client.view.html'
		}).
		state('viewPlacement', {
			url: '/placements/:placementId',
			templateUrl: 'modules/placements/views/view-placement.client.view.html'
		}).
		state('editPlacement', {
			url: '/placements/:placementId/edit',
			templateUrl: 'modules/placements/views/edit-placement.client.view.html'
		});
	}
]);