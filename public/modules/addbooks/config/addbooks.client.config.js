'use strict';

// Configuring the Articles module
angular.module('addbooks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Library', 'addbooks', 'dropdown', '/addbooks(/create)?');
		Menus.addSubMenuItem('topbar', 'addbooks', 'Search Books', 'addbooks');
		Menus.addSubMenuItem('topbar', 'addbooks', 'Add Books', 'addbooks/create');
		/*Menus.addSubMenuItem('topbar', 'addbooks', 'Issue Book', 'addbooks/issue');
		Menus.addSubMenuItem('topbar', 'addbooks', 'Return Book', 'addbooks/return');
		Menus.addSubMenuItem('topbar', 'addbooks', 'Book Renewal book', 'addbooks/renewal');*/
	}
]);