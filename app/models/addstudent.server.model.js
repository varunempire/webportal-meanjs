'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Addstudent Schema
 */
var AddstudentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Addstudent name',
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

mongoose.model('Addstudent', AddstudentSchema);