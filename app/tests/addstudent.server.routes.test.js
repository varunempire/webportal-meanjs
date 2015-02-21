'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Addstudent = mongoose.model('Addstudent'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, addstudent;

/**
 * Addstudent routes tests
 */
describe('Addstudent CRUD tests', function() {
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

		// Save a user to the test db and create new Addstudent
		user.save(function() {
			addstudent = {
				name: 'Addstudent Name'
			};

			done();
		});
	});

	it('should be able to save Addstudent instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addstudent
				agent.post('/addstudents')
					.send(addstudent)
					.expect(200)
					.end(function(addstudentSaveErr, addstudentSaveRes) {
						// Handle Addstudent save error
						if (addstudentSaveErr) done(addstudentSaveErr);

						// Get a list of Addstudents
						agent.get('/addstudents')
							.end(function(addstudentsGetErr, addstudentsGetRes) {
								// Handle Addstudent save error
								if (addstudentsGetErr) done(addstudentsGetErr);

								// Get Addstudents list
								var addstudents = addstudentsGetRes.body;

								// Set assertions
								(addstudents[0].user._id).should.equal(userId);
								(addstudents[0].name).should.match('Addstudent Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Addstudent instance if not logged in', function(done) {
		agent.post('/addstudents')
			.send(addstudent)
			.expect(401)
			.end(function(addstudentSaveErr, addstudentSaveRes) {
				// Call the assertion callback
				done(addstudentSaveErr);
			});
	});

	it('should not be able to save Addstudent instance if no name is provided', function(done) {
		// Invalidate name field
		addstudent.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addstudent
				agent.post('/addstudents')
					.send(addstudent)
					.expect(400)
					.end(function(addstudentSaveErr, addstudentSaveRes) {
						// Set message assertion
						(addstudentSaveRes.body.message).should.match('Please fill Addstudent name');
						
						// Handle Addstudent save error
						done(addstudentSaveErr);
					});
			});
	});

	it('should be able to update Addstudent instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addstudent
				agent.post('/addstudents')
					.send(addstudent)
					.expect(200)
					.end(function(addstudentSaveErr, addstudentSaveRes) {
						// Handle Addstudent save error
						if (addstudentSaveErr) done(addstudentSaveErr);

						// Update Addstudent name
						addstudent.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Addstudent
						agent.put('/addstudents/' + addstudentSaveRes.body._id)
							.send(addstudent)
							.expect(200)
							.end(function(addstudentUpdateErr, addstudentUpdateRes) {
								// Handle Addstudent update error
								if (addstudentUpdateErr) done(addstudentUpdateErr);

								// Set assertions
								(addstudentUpdateRes.body._id).should.equal(addstudentSaveRes.body._id);
								(addstudentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Addstudents if not signed in', function(done) {
		// Create new Addstudent model instance
		var addstudentObj = new Addstudent(addstudent);

		// Save the Addstudent
		addstudentObj.save(function() {
			// Request Addstudents
			request(app).get('/addstudents')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Addstudent if not signed in', function(done) {
		// Create new Addstudent model instance
		var addstudentObj = new Addstudent(addstudent);

		// Save the Addstudent
		addstudentObj.save(function() {
			request(app).get('/addstudents/' + addstudentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', addstudent.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Addstudent instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Addstudent
				agent.post('/addstudents')
					.send(addstudent)
					.expect(200)
					.end(function(addstudentSaveErr, addstudentSaveRes) {
						// Handle Addstudent save error
						if (addstudentSaveErr) done(addstudentSaveErr);

						// Delete existing Addstudent
						agent.delete('/addstudents/' + addstudentSaveRes.body._id)
							.send(addstudent)
							.expect(200)
							.end(function(addstudentDeleteErr, addstudentDeleteRes) {
								// Handle Addstudent error error
								if (addstudentDeleteErr) done(addstudentDeleteErr);

								// Set assertions
								(addstudentDeleteRes.body._id).should.equal(addstudentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Addstudent instance if not signed in', function(done) {
		// Set Addstudent user 
		addstudent.user = user;

		// Create new Addstudent model instance
		var addstudentObj = new Addstudent(addstudent);

		// Save the Addstudent
		addstudentObj.save(function() {
			// Try deleting Addstudent
			request(app).delete('/addstudents/' + addstudentObj._id)
			.expect(401)
			.end(function(addstudentDeleteErr, addstudentDeleteRes) {
				// Set message assertion
				(addstudentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Addstudent error error
				done(addstudentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Addstudent.remove().exec();
		done();
	});
});