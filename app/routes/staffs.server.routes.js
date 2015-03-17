'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var staffs = require('../../app/controllers/staffs.server.controller');

	// Staffs Routes
	app.route('/staffs')
		.get(staffs.list)
		.post(users.requiresLogin, staffs.create);

	app.route('/staffs/:staffId')
		.get(staffs.read)
		.put(users.requiresLogin, staffs.hasAuthorization, staffs.update)
		.delete(users.requiresLogin, staffs.hasAuthorization, staffs.delete);

	// Finish by binding the Staff middleware
	app.param('staffId', staffs.staffByID);
};
