'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Placement Schema
 */
var PlacementSchema = new Schema({
	fname: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	dept: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	preaddress: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	mail: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	caste: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	lname: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	year: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	peraddress: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	nation: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	sex: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	course: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	rollno: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	mobno: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	community: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	dob: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	cursem: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	xmedofstudy: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	totalper: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	gpa: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	cgpa: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	scname: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	sclocation: {
		type: String,
		default: '',
		required: 'Please fill Placement name',
		trim: true
	},
	staffusername: {
		type: String,
		default: ''
	},
	studentusername: {
		type: String,
		default: ''
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

mongoose.model('Placement', PlacementSchema);