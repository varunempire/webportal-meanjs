'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Placement = mongoose.model('Placement'),
	_ = require('lodash');

/**
 * Create a Placement
 */
exports.create = function(req, res) {
	var placement = new Placement(req.body);
	placement.user = req.user;

	placement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(placement);
		}
	});
};

/**
 * Show the current Placement
 */
exports.read = function(req, res) {
	res.jsonp(req.placement);
};

/**
 * Update a Placement
 */
exports.update = function(req, res) {
	var placement = req.placement ;

	placement = _.extend(placement , req.body);

	placement.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(placement);
		}
	});
};

/**
 * Delete an Placement
 */
exports.delete = function(req, res) {
	var placement = req.placement ;

	placement.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(placement);
		}
	});
};

/**
 * List of Placements
 */
exports.list = function(req, res) { 
	Placement.find().sort('-created').populate('user', 'displayName').exec(function(err, placements) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(placements);
		}
	});
};

/**
 * Placement middleware
 */
exports.placementByID = function(req, res, next, id) { 
	Placement.findById(id).populate('user', 'displayName').exec(function(err, placement) {
		if (err) return next(err);
		if (! placement) return next(new Error('Failed to load Placement ' + id));
		req.placement = placement ;
		next();
	});
};

/**
 * Placement authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.placement.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
