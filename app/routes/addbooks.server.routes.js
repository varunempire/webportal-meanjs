'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var addbooks = require('../../app/controllers/addbooks.server.controller');

	// Addbooks Routes
	app.route('/addbooks')
		.get(addbooks.list)
		.post(users.requiresLogin, addbooks.create);

	app.route('/addbooks/:addbookId')
		.get(addbooks.read)
		.put(users.requiresLogin, addbooks.hasAuthorization, addbooks.update)
		.delete(users.requiresLogin, addbooks.hasAuthorization, addbooks.delete);
	
	// Upload Route
	app.route('/upload')
		.post(addbooks.upload);

	// Finish by binding the Addbook middleware
	app.param('addbookId', addbooks.addbookByID);
};
