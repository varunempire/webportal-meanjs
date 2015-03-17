'use strict';

// Configuring the Articles module
angular.module('placements').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Placements', 'placements', 'dropdown', '/placements(/create)?');
		Menus.addSubMenuItem('topbar', 'placements', 'List Placements', 'placements');
		Menus.addSubMenuItem('topbar', 'placements', 'New Placement', 'placements/create');
	}
]);