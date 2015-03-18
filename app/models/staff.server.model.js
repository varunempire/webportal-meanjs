'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Staff Schema
 */
var StaffSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	dept: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	dob: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	peradd: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mail: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mob: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	experience: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	qualification: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	maritial: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	gender: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	religion: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	caste: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	community: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	/*
	name: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	regno: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	course: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	dept: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	year: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	sec: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	cursem: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	leave: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	attendance: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mark1: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mark2: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mark3: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mark4: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	},
	mark5: {
		type: String,
		default: '',
		required: 'Please fill Staff name',
		trim: true
	}, */
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Staff', StaffSchema);