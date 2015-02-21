'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Addbook = mongoose.model('Addbook'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, addbook;

/**
 * Addbook routes tests
 */
describe('Addbook CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Addbook
		user.save(function() {
			addbook = {
				name: 'Addbook Name'
			};

			done();
		});
	});

	it('should be able to save Addbook instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addbook
				agent.post('/addbooks')
					.send(addbook)
					.expect(200)
					.end(function(addbookSaveErr, addbookSaveRes) {
						// Handle Addbook save error
						if (addbookSaveErr) done(addbookSaveErr);

						// Get a list of Addbooks
						agent.get('/addbooks')
							.end(function(addbooksGetErr, addbooksGetRes) {
								// Handle Addbook save error
								if (addbooksGetErr) done(addbooksGetErr);

								// Get Addbooks list
								var addbooks = addbooksGetRes.body;

								// Set assertions
								(addbooks[0].user._id).should.equal(userId);
								(addbooks[0].name).should.match('Addbook Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Addbook instance if not logged in', function(done) {
		agent.post('/addbooks')
			.send(addbook)
			.expect(401)
			.end(function(addbookSaveErr, addbookSaveRes) {
				// Call the assertion callback
				done(addbookSaveErr);
			});
	});

	it('should not be able to save Addbook instance if no name is provided', function(done) {
		// Invalidate name field
		addbook.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addbook
				agent.post('/addbooks')
					.send(addbook)
					.expect(400)
					.end(function(addbookSaveErr, addbookSaveRes) {
						// Set message assertion
						(addbookSaveRes.body.message).should.match('Please fill Addbook name');
						
						// Handle Addbook save error
						done(addbookSaveErr);
					});
			});
	});

	it('should be able to update Addbook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addbook
				agent.post('/addbooks')
					.send(addbook)
					.expect(200)
					.end(function(addbookSaveErr, addbookSaveRes) {
						// Handle Addbook save error
						if (addbookSaveErr) done(addbookSaveErr);

						// Update Addbook name
						addbook.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Addbook
						agent.put('/addbooks/' + addbookSaveRes.body._id)
							.send(addbook)
							.expect(200)
							.end(function(addbookUpdateErr, addbookUpdateRes) {
								// Handle Addbook update error
								if (addbookUpdateErr) done(addbookUpdateErr);

								// Set assertions
								(addbookUpdateRes.body._id).should.equal(addbookSaveRes.body._id);
								(addbookUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Addbooks if not signed in', function(done) {
		// Create new Addbook model instance
		var addbookObj = new Addbook(addbook);

		// Save the Addbook
		addbookObj.save(function() {
			// Request Addbooks
			request(app).get('/addbooks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Addbook if not signed in', function(done) {
		// Create new Addbook model instance
		var addbookObj = new Addbook(addbook);

		// Save the Addbook
		addbookObj.save(function() {
			request(app).get('/addbooks/' + addbookObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', addbook.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Addbook instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addbook
				agent.post('/addbooks')
					.send(addbook)
					.expect(200)
					.end(function(addbookSaveErr, addbookSaveRes) {
						// Handle Addbook save error
						if (addbookSaveErr) done(addbookSaveErr);

						// Delete existing Addbook
						agent.delete('/addbooks/' + addbookSaveRes.body._id)
							.send(addbook)
							.expect(200)
							.end(function(addbookDeleteErr, addbookDeleteRes) {
								// Handle Addbook error error
								if (addbookDeleteErr) done(addbookDeleteErr);

								// Set assertions
								(addbookDeleteRes.body._id).should.equal(addbookSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Addbook instance if not signed in', function(done) {
		// Set Addbook user 
		addbook.user = user;

		// Create new Addbook model instance
		var addbookObj = new Addbook(addbook);

		// Save the Addbook
		addbookObj.save(function() {
			// Try deleting Addbook
			request(app).delete('/addbooks/' + addbookObj._id)
			.expect(401)
			.end(function(addbookDeleteErr, addbookDeleteRes) {
				// Set message assertion
				(addbookDeleteRes.body.message).should.match('User is not logged in');

				// Handle Addbook error error
				done(addbookDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Addbook.remove().exec();
		done();
	});
});