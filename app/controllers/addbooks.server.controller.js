'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Addbook = mongoose.model('Addbook'),
	_ = require('lodash');

/**
 * Create a Addbook
 */
exports.create = function(req, res) {
	var addbook = new Addbook(req.body);
	addbook.user = req.user;

	addbook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addbook);
		}
	});
};

/**
 * Show the current Addbook
 */
exports.read = function(req, res) {
	res.jsonp(req.addbook);
};

/**
 * Update a Addbook
 */
exports.update = function(req, res) {
	var addbook = req.addbook ;

	addbook = _.extend(addbook , req.body);

	addbook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addbook);
		}
	});
};

/**
 * Delete an Addbook
 */
exports.delete = function(req, res) {
	var addbook = req.addbook ;

	addbook.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addbook);
		}
	});
};

/**
 * List of Addbooks
 */
exports.list = function(req, res) { 
	Addbook.find().sort('-created').populate('user', 'displayName').exec(function(err, addbooks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(addbooks);
		}
	});
};

/**
 * Addbook middleware
 */
exports.addbookByID = function(req, res, next, id) { 
	Addbook.findById(id).populate('user', 'displayName').exec(function(err, addbook) {
		if (err) return next(err);
		if (! addbook) return next(new Error('Failed to load Addbook ' + id));
		req.addbook = addbook ;
		next();
	});
};

/**
 * Addbook authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.addbook.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
