'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Placement = mongoose.model('Placement'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, placement;

/**
 * Placement routes tests
 */
describe('Placement CRUD tests', function() {
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

		// Save a user to the test db and create new Placement
		user.save(function() {
			placement = {
				name: 'Placement Name'
			};

			done();
		});
	});

	it('should be able to save Placement instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Placement
				agent.post('/placements')
					.send(placement)
					.expect(200)
					.end(function(placementSaveErr, placementSaveRes) {
						// Handle Placement save error
						if (placementSaveErr) done(placementSaveErr);

						// Get a list of Placements
						agent.get('/placements')
							.end(function(placementsGetErr, placementsGetRes) {
								// Handle Placement save error
								if (placementsGetErr) done(placementsGetErr);

								// Get Placements list
								var placements = placementsGetRes.body;

								// Set assertions
								(placements[0].user._id).should.equal(userId);
								(placements[0].name).should.match('Placement Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Placement instance if not logged in', function(done) {
		agent.post('/placements')
			.send(placement)
			.expect(401)
			.end(function(placementSaveErr, placementSaveRes) {
				// Call the assertion callback
				done(placementSaveErr);
			});
	});

	it('should not be able to save Placement instance if no name is provided', function(done) {
		// Invalidate name field
		placement.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Placement
				agent.post('/placements')
					.send(placement)
					.expect(400)
					.end(function(placementSaveErr, placementSaveRes) {
						// Set message assertion
						(placementSaveRes.body.message).should.match('Please fill Placement name');
						
						// Handle Placement save error
						done(placementSaveErr);
					});
			});
	});

	it('should be able to update Placement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Placement
				agent.post('/placements')
					.send(placement)
					.expect(200)
					.end(function(placementSaveErr, placementSaveRes) {
						// Handle Placement save error
						if (placementSaveErr) done(placementSaveErr);

						// Update Placement name
						placement.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Placement
						agent.put('/placements/' + placementSaveRes.body._id)
							.send(placement)
							.expect(200)
							.end(function(placementUpdateErr, placementUpdateRes) {
								// Handle Placement update error
								if (placementUpdateErr) done(placementUpdateErr);

								// Set assertions
								(placementUpdateRes.body._id).should.equal(placementSaveRes.body._id);
								(placementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Placements if not signed in', function(done) {
		// Create new Placement model instance
		var placementObj = new Placement(placement);

		// Save the Placement
		placementObj.save(function() {
			// Request Placements
			request(app).get('/placements')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Placement if not signed in', function(done) {
		// Create new Placement model instance
		var placementObj = new Placement(placement);

		// Save the Placement
		placementObj.save(function() {
			request(app).get('/placements/' + placementObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', placement.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Placement instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Placement
				agent.post('/placements')
					.send(placement)
					.expect(200)
					.end(function(placementSaveErr, placementSaveRes) {
						// Handle Placement save error
						if (placementSaveErr) done(placementSaveErr);

						// Delete existing Placement
						agent.delete('/placements/' + placementSaveRes.body._id)
							.send(placement)
							.expect(200)
							.end(function(placementDeleteErr, placementDeleteRes) {
								// Handle Placement error error
								if (placementDeleteErr) done(placementDeleteErr);

								// Set assertions
								(placementDeleteRes.body._id).should.equal(placementSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Placement instance if not signed in', function(done) {
		// Set Placement user 
		placement.user = user;

		// Create new Placement model instance
		var placementObj = new Placement(placement);

		// Save the Placement
		placementObj.save(function() {
			// Try deleting Placement
			request(app).delete('/placements/' + placementObj._id)
			.expect(401)
			.end(function(placementDeleteErr, placementDeleteRes) {
				// Set message assertion
				(placementDeleteRes.body.message).should.match('User is not logged in');

				// Handle Placement error error
				done(placementDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Placement.remove().exec();
		done();
	});
});