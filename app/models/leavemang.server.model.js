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
		trim: true
	},
	rollno: {
		type: String,
		default: '',
		trim: true
	},
	course: {
		type: String,
		default: '',
		trim: true
	},
	dept: {
		type: String,
		default: '',
		trim: true
	},
	year: {
		type: String,
		default: '',
		trim: true
	},
	section: {
		type: String,
		default: '',
		trim: true
	},
	reason: {
		type: String,
		default: '',
		trim: true
	},
	from: {
		type: String,
		default: '',
		trim: true
	},
	to: {
		type: String,
		default: '',
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