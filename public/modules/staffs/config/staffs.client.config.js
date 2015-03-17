'use strict';

// Configuring the Articles module
angular.module('staffs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Staffs', 'staffs', 'dropdown', '/staffs(/create)?');
		Menus.addSubMenuItem('topbar', 'staffs', 'List Staffs', 'staffs');
		Menus.addSubMenuItem('topbar', 'staffs', 'New Staff', 'staffs/create');
	}
]);