'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Leavemang = mongoose.model('Leavemang'),
	_ = require('lodash');

/**
 * Create a Leavemang
 */
exports.create = function(req, res) {
	var leavemang = new Leavemang(req.body);
	leavemang.user = req.user;

	leavemang.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leavemang);
		}
	});
};

/**
 * Show the current Leavemang
 */
exports.read = function(req, res) {
	res.jsonp(req.leavemang);
};

/**
 * Update a Leavemang
 */
exports.update = function(req, res) {
	var leavemang = req.leavemang ;

	leavemang = _.extend(leavemang , req.body);

	leavemang.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leavemang);
		}
	});
};

/**
 * Delete an Leavemang
 */
exports.delete = function(req, res) {
	var leavemang = req.leavemang ;

	leavemang.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leavemang);
		}
	});
};

/**
 * List of Leavemangs
 */
exports.list = function(req, res) { 
	Leavemang.find().sort('-created').populate('user', 'displayName').exec(function(err, leavemangs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leavemangs);
		}
	});
};

/**
 * Leavemang middleware
 */
exports.leavemangByID = function(req, res, next, id) { 
	Leavemang.findById(id).populate('user', 'displayName').exec(function(err, leavemang) {
		if (err) return next(err);
		if (! leavemang) return next(new Error('Failed to load Leavemang ' + id));
		req.leavemang = leavemang ;
		next();
	});
};

/**
 * Leavemang authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.leavemang.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
