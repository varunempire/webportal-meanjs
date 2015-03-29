'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var leavemangs = require('../../app/controllers/leavemangs.server.controller');

	// Leavemangs Routes
	app.route('/leavemangs')
		.get(leavemangs.list)
		.post(users.requiresLogin, leavemangs.create);

	app.route('/leavemangs/:leavemangId')
		.get(leavemangs.read)
		.put(users.requiresLogin, leavemangs.update)
		.delete(users.requiresLogin, leavemangs.hasAuthorization, leavemangs.delete);

	// Finish by binding the Leavemang middleware
	app.param('leavemangId', leavemangs.leavemangByID);
};
