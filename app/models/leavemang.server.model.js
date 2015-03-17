'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Leavemang Schema
 */
var LeavemangSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Leavemang name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Leavemang', LeavemangSchema);