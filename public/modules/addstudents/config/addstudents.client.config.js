'use strict';

// Configuring the Articles module
angular.module('addstudents').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Addstudents', 'addstudents', 'dropdown', '/addstudents(/create)?');
		Menus.addSubMenuItem('topbar', 'addstudents', 'List Addstudents', 'addstudents');
		Menus.addSubMenuItem('topbar', 'addstudents', 'New Addstudent', 'addstudents/create');
	}
]);