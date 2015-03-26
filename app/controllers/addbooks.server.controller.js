'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Addbook = mongoose.model('Addbook'),
	_ = require('lodash'),
	fs = require('fs');

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

/**
 * Addbook file upload
 */
exports.upload = function (req, res) {

    var oldPath = req.files.myFile.path;
    var separator = '\\';
    var filename = oldPath.split(separator)[oldPath.split(separator).length-1];
    var newPath = ['uploads', filename].join(separator);

    console.log('>>>>>');
    console.log('__dirname', __dirname);
    console.log('oldPath', oldPath);
    console.log('newPath: ', newPath);
    console.log('filename: ', filename);

    fs.rename(oldPath, oldPath, function (err) {
        if (err === null) {
            var book = {
                /*title: req.body.title || "???",
                author: req.body.author || "???",
                description: req.body.description || "???",*/
				name: 'fgf',
				bookno: 'fg',
				course: 'fg',
				dept: 'fg',
				year: 'fgf',
				sem: 'fg',
				avbooks: 'fg',
				edition: 'fg',
				publisher: 'g',
				author: 'g',
				download: 'g',
				code: 'g',
				sno: 'g',
				copy: 'g',
				regbook: 'g',
				issue: 'g',
				penalty: 'g',
				renewal: 'g',
				mag: 'g',
				smag: 'g',
				Journals: 'g',
				newspaper: 'g',
                image: {
                    modificationDate: req.files.myFile.modifiedDate || new Date(),
                    name: req.files.myFile.name || "???",
                    size: req.files.myFile.size || 0,
                    type: req.files.myFile.extension || "???",
                    filename: newPath
                },
                user: req.user
            };
            var addbook = new Addbook(book);

            console.log('Renaming file to ', req.files.myFile.name);

            addbook.save(function (err) {

                var retObj = {
                    meta: {"action": "upload", 'timestamp': new Date(), filename: __filename},
                    doc: addbook,
                    err: err
                };
                return res.send(retObj);
            });
        }
    });
}