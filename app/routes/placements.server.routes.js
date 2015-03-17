'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var placements = require('../../app/controllers/placements.server.controller');

	// Placements Routes
	app.route('/placements')
		.get(placements.list)
		.post(users.requiresLogin, placements.create);

	app.route('/placements/:placementId')
		.get(placements.read)
		.put(users.requiresLogin, placements.hasAuthorization, placements.update)
		.delete(users.requiresLogin, placements.hasAuthorization, placements.delete);

	// Finish by binding the Placement middleware
	app.param('placementId', placements.placementByID);
};
