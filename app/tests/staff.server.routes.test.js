'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Staff = mongoose.model('Staff'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, staff;

/**
 * Staff routes tests
 */
describe('Staff CRUD tests', function() {
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

		// Save a user to the test db and create new Staff
		user.save(function() {
			staff = {
				name: 'Staff Name'
			};

			done();
		});
	});

	it('should be able to save Staff instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Staff
				agent.post('/staffs')
					.send(staff)
					.expect(200)
					.end(function(staffSaveErr, staffSaveRes) {
						// Handle Staff save error
						if (staffSaveErr) done(staffSaveErr);

						// Get a list of Staffs
						agent.get('/staffs')
							.end(function(staffsGetErr, staffsGetRes) {
								// Handle Staff save error
								if (staffsGetErr) done(staffsGetErr);

								// Get Staffs list
								var staffs = staffsGetRes.body;

								// Set assertions
								(staffs[0].user._id).should.equal(userId);
								(staffs[0].name).should.match('Staff Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Staff instance if not logged in', function(done) {
		agent.post('/staffs')
			.send(staff)
			.expect(401)
			.end(function(staffSaveErr, staffSaveRes) {
				// Call the assertion callback
				done(staffSaveErr);
			});
	});

	it('should not be able to save Staff instance if no name is provided', function(done) {
		// Invalidate name field
		staff.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Staff
				agent.post('/staffs')
					.send(staff)
					.expect(400)
					.end(function(staffSaveErr, staffSaveRes) {
						// Set message assertion
						(staffSaveRes.body.message).should.match('Please fill Staff name');
						
						// Handle Staff save error
						done(staffSaveErr);
					});
			});
	});

	it('should be able to update Staff instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Staff
				agent.post('/staffs')
					.send(staff)
					.expect(200)
					.end(function(staffSaveErr, staffSaveRes) {
						// Handle Staff save error
						if (staffSaveErr) done(staffSaveErr);

						// Update Staff name
						staff.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Staff
						agent.put('/staffs/' + staffSaveRes.body._id)
							.send(staff)
							.expect(200)
							.end(function(staffUpdateErr, staffUpdateRes) {
								// Handle Staff update error
								if (staffUpdateErr) done(staffUpdateErr);

								// Set assertions
								(staffUpdateRes.body._id).should.equal(staffSaveRes.body._id);
								(staffUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Staffs if not signed in', function(done) {
		// Create new Staff model instance
		var staffObj = new Staff(staff);

		// Save the Staff
		staffObj.save(function() {
			// Request Staffs
			request(app).get('/staffs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Staff if not signed in', function(done) {
		// Create new Staff model instance
		var staffObj = new Staff(staff);

		// Save the Staff
		staffObj.save(function() {
			request(app).get('/staffs/' + staffObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', staff.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Staff instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Staff
				agent.post('/staffs')
					.send(staff)
					.expect(200)
					.end(function(staffSaveErr, staffSaveRes) {
						// Handle Staff save error
						if (staffSaveErr) done(staffSaveErr);

						// Delete existing Staff
						agent.delete('/staffs/' + staffSaveRes.body._id)
							.send(staff)
							.expect(200)
							.end(function(staffDeleteErr, staffDeleteRes) {
								// Handle Staff error error
								if (staffDeleteErr) done(staffDeleteErr);

								// Set assertions
								(staffDeleteRes.body._id).should.equal(staffSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Staff instance if not signed in', function(done) {
		// Set Staff user 
		staff.user = user;

		// Create new Staff model instance
		var staffObj = new Staff(staff);

		// Save the Staff
		staffObj.save(function() {
			// Try deleting Staff
			request(app).delete('/staffs/' + staffObj._id)
			.expect(401)
			.end(function(staffDeleteErr, staffDeleteRes) {
				// Set message assertion
				(staffDeleteRes.body.message).should.match('User is not logged in');

				// Handle Staff error error
				done(staffDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Staff.remove().exec();
		done();
	});
});