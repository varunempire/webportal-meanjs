'use strict';

// Configuring the Articles module
angular.module('leavemangs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Leavemangs', 'leavemangs', 'dropdown', '/leavemangs(/create)?');
		Menus.addSubMenuItem('topbar', 'leavemangs', 'List Leavemangs', 'leavemangs');
		Menus.addSubMenuItem('topbar', 'leavemangs', 'New Leavemang', 'leavemangs/create');
	}
]);