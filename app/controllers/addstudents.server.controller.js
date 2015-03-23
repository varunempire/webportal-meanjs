'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Addstudent = mongoose.model('Addstudent'),
	_ = require('lodash');

/**
 * Create a Addstudent
 */
exports.create = function(req, res) {
	var addstudent = new Addstudent(req.body);
	addstudent.user = req.user;
	
	addstudent.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addstudent);
		}
	});
};

/**
 * Show the current Addstudent
 */
exports.read = function(req, res) {
	res.jsonp(req.addstudent);
};

/**
 * Update a Addstudent
 */
exports.update = function(req, res) {
	var addstudent = req.addstudent ;

	addstudent = _.extend(addstudent , req.body);

	addstudent.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addstudent);
		}
	});
};

/**
 * Delete an Addstudent
 */
exports.delete = function(req, res) {
	var addstudent = req.addstudent ;

	addstudent.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addstudent);
		}
	});
};

/**
 * List of Addstudents
 */
exports.list = function(req, res) { 
	Addstudent.find().sort('-created').populate('user', 'displayName').exec(function(err, addstudents) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addstudents);
		}
	});
};

/**
 * Addstudent middleware
 */
exports.addstudentByID = function(req, res, next, id) { 
	Addstudent.findById(id).populate('user', 'displayName').exec(function(err, addstudent) {
		if (err) return next(err);
		if (! addstudent) return next(new Error('Failed to load Addstudent ' + id));
		req.addstudent = addstudent ;
		next();
	});
};

/**
 * Addstudent authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.addstudent.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
