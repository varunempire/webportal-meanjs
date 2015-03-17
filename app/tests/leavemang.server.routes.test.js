'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Leavemang = mongoose.model('Leavemang'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, leavemang;

/**
 * Leavemang routes tests
 */
describe('Leavemang CRUD tests', function() {
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

		// Save a user to the test db and create new Leavemang
		user.save(function() {
			leavemang = {
				name: 'Leavemang Name'
			};

			done();
		});
	});

	it('should be able to save Leavemang instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leavemang
				agent.post('/leavemangs')
					.send(leavemang)
					.expect(200)
					.end(function(leavemangSaveErr, leavemangSaveRes) {
						// Handle Leavemang save error
						if (leavemangSaveErr) done(leavemangSaveErr);

						// Get a list of Leavemangs
						agent.get('/leavemangs')
							.end(function(leavemangsGetErr, leavemangsGetRes) {
								// Handle Leavemang save error
								if (leavemangsGetErr) done(leavemangsGetErr);

								// Get Leavemangs list
								var leavemangs = leavemangsGetRes.body;

								// Set assertions
								(leavemangs[0].user._id).should.equal(userId);
								(leavemangs[0].name).should.match('Leavemang Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Leavemang instance if not logged in', function(done) {
		agent.post('/leavemangs')
			.send(leavemang)
			.expect(401)
			.end(function(leavemangSaveErr, leavemangSaveRes) {
				// Call the assertion callback
				done(leavemangSaveErr);
			});
	});

	it('should not be able to save Leavemang instance if no name is provided', function(done) {
		// Invalidate name field
		leavemang.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leavemang
				agent.post('/leavemangs')
					.send(leavemang)
					.expect(400)
					.end(function(leavemangSaveErr, leavemangSaveRes) {
						// Set message assertion
						(leavemangSaveRes.body.message).should.match('Please fill Leavemang name');
						
						// Handle Leavemang save error
						done(leavemangSaveErr);
					});
			});
	});

	it('should be able to update Leavemang instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leavemang
				agent.post('/leavemangs')
					.send(leavemang)
					.expect(200)
					.end(function(leavemangSaveErr, leavemangSaveRes) {
						// Handle Leavemang save error
						if (leavemangSaveErr) done(leavemangSaveErr);

						// Update Leavemang name
						leavemang.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Leavemang
						agent.put('/leavemangs/' + leavemangSaveRes.body._id)
							.send(leavemang)
							.expect(200)
							.end(function(leavemangUpdateErr, leavemangUpdateRes) {
								// Handle Leavemang update error
								if (leavemangUpdateErr) done(leavemangUpdateErr);

								// Set assertions
								(leavemangUpdateRes.body._id).should.equal(leavemangSaveRes.body._id);
								(leavemangUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Leavemangs if not signed in', function(done) {
		// Create new Leavemang model instance
		var leavemangObj = new Leavemang(leavemang);

		// Save the Leavemang
		leavemangObj.save(function() {
			// Request Leavemangs
			request(app).get('/leavemangs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Leavemang if not signed in', function(done) {
		// Create new Leavemang model instance
		var leavemangObj = new Leavemang(leavemang);

		// Save the Leavemang
		leavemangObj.save(function() {
			request(app).get('/leavemangs/' + leavemangObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', leavemang.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Leavemang instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Leavemang
				agent.post('/leavemangs')
					.send(leavemang)
					.expect(200)
					.end(function(leavemangSaveErr, leavemangSaveRes) {
						// Handle Leavemang save error
						if (leavemangSaveErr) done(leavemangSaveErr);

						// Delete existing Leavemang
						agent.delete('/leavemangs/' + leavemangSaveRes.body._id)
							.send(leavemang)
							.expect(200)
							.end(function(leavemangDeleteErr, leavemangDeleteRes) {
								// Handle Leavemang error error
								if (leavemangDeleteErr) done(leavemangDeleteErr);

								// Set assertions
								(leavemangDeleteRes.body._id).should.equal(leavemangSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Leavemang instance if not signed in', function(done) {
		// Set Leavemang user 
		leavemang.user = user;

		// Create new Leavemang model instance
		var leavemangObj = new Leavemang(leavemang);

		// Save the Leavemang
		leavemangObj.save(function() {
			// Try deleting Leavemang
			request(app).delete('/leavemangs/' + leavemangObj._id)
			.expect(401)
			.end(function(leavemangDeleteErr, leavemangDeleteRes) {
				// Set message assertion
				(leavemangDeleteRes.body.message).should.match('User is not logged in');

				// Handle Leavemang error error
				done(leavemangDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Leavemang.remove().exec();
		done();
	});
});