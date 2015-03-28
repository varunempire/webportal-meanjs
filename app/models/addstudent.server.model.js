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
	lname: {
		type: String,
		default: ''
	},
	dateofbirth: {
		type: String,
		default: '',
		trim: true
	},
	rollno: {
		type: String,
		default: '',
		trim: true
	},
	regno: {
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
	mail: {
		type: String,
		default: '',
		trim: true
	},
	mobile: {
		type: String,
		default: '',
		trim: true
	},
	blood: {
		type: String,
		default: '',
		trim: true
	},
	bus: {
		type: String,
		default: '',
		trim: true
	},
	presentaddress: {
		type: String,
		default: '',
		trim: true
	},
	permanentaddress: {
		type: String,
		default: '',
		trim: true
	},
	fname: {
		type: String,
		default: '',
		trim: true
	},
	occupation: {
		type: String,
		default: '',
		trim: true
	},
	fmobno: {
		type: String,
		default: '',
		trim: true
	},
	mname: {
		type: String,
		default: '',
		trim: true
	},
	moccupation: {
		type: String,
		default: '',
		trim: true
	},
	mmobno: {
		type: String,
		default: '',
		trim: true
	},
	roomno: {
		type: String,
		default: '',
		trim: true
	},
	localgaddress: {
		type: String,
		default: '',
		trim: true
	},
	doj: {
		type: String,
		default: '',
		trim: true
	},
	username: {
		type: String,
		default: '',
	},
	role: {
		type: String,
		default: '',
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