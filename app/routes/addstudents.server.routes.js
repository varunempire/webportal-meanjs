'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var addstudents = require('../../app/controllers/addstudents.server.controller');

	// Addstudents Routes
	app.route('/addstudents')
		.get(addstudents.list)
		.post(users.requiresLogin, addstudents.create);

	app.route('/addstudents/:addstudentId')
		.get(addstudents.read)
		.put(users.requiresLogin, addstudents.hasAuthorization, addstudents.update)
		.delete(users.requiresLogin, addstudents.hasAuthorization, addstudents.delete);

	// Finish by binding the Addstudent middleware
	app.param('addstudentId', addstudents.addstudentByID);
};
