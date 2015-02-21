'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Addbook Schema
 */
var AddbookSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Addbook name',
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

mongoose.model('Addbook', AddbookSchema);