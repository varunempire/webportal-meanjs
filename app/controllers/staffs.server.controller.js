'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Staff = mongoose.model('Staff'),
	_ = require('lodash');

/**
 * Create a Staff
 */
exports.create = function(req, res) {
	var staff = new Staff(req.body);
	staff.user = req.user;

	staff.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(staff);
		}
	});
};

/**
 * Show the current Staff
 */
exports.read = function(req, res) {
	res.jsonp(req.staff);
};

/**
 * Update a Staff
 */
exports.update = function(req, res) {
	var staff = req.staff ;

	staff = _.extend(staff , req.body);

	staff.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(staff);
		}
	});
};

/**
 * Delete an Staff
 */
exports.delete = function(req, res) {
	var staff = req.staff ;

	staff.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(staff);
		}
	});
};

/**
 * List of Staffs
 */
exports.list = function(req, res) { 
	Staff.find().sort('-created').populate('user', 'displayName').exec(function(err, staffs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(staffs);
		}
	});
};

/**
 * Staff middleware
 */
exports.staffByID = function(req, res, next, id) { 
	Staff.findById(id).populate('user', 'displayName').exec(function(err, staff) {
		if (err) return next(err);
		if (! staff) return next(new Error('Failed to load Staff ' + id));
		req.staff = staff ;
		next();
	});
};

/**
 * Staff authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.staff.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
