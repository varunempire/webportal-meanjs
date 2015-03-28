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
		default: ''
	},
	bookno: {
		type: String,
		default: ''
	},
	publisher: {
		type: String,
		default: ''
	},
	code: {
		type: String,
		default: ''
	},
	edition: {
		type: String,
		default: ''
	},
	
	author: {
		type: String,
		default: ''
	},
	course: {
		type: String,
		default: ''
	},	
	dept: {
		type: String,
		default: ''
	},
	year: {
		type: String,
		default: ''
	},
	sem: {
		type: String,
		default: ''
	},
/*	avbooks: {
		type: String,
		default: '',
		required: 'Please fill avbooks name',
		trim: true
	},*/
	
	/*download: {
		type: String,
		default: '',
		required: 'Please fill download name',
		trim: true
	},*/
	/*edit: {
		type: String,
		default: '',
		required: 'Please fill edit name',
		trim: true
	}*/
	image: { // <--- nested document (not sub document)
        modificationDate: {type: Date},
        name: {type: String},
        size: {type: Number},
        type: {type: String},
        filename: {type: String}
    },
	
	/*sno: {
		type: String,
		default: '',
		required: 'Please fill sno name',
		trim: true
	},*/
	/*copy: {
		type: String,
		default: '',
		required: 'Please fill copy name',
		trim: true
	},
	regbook: {
		type: String,
		default: '',
		required: 'Please fill regbook name',
		trim: true
	},
	issue: {
		type: String,
		default: '',
		required: 'Please fill issue name',
		trim: true
	},
	penalty: {
		type: String,
		default: '',
		required: 'Please fill penalty name',
		trim: true
	},
	renewal: {
		type: String,
		default: '',
		required: 'Please fill renewal name',
		trim: true
	},
	mag: {
		type: String,
		default: '',
		required: 'Please fill mag name',
		trim: true
	},
	smag: {
		type: String,
		default: '',
		required: 'Please fill smag name',
		trim: true
	},
	Journals: {
		type: String,
		default: '',
		required: 'Please fill Journals name',
		trim: true
	},
	newspaper: {
		type: String,
		default: '',
		required: 'Please fill newspaper name',
		trim: true
	},*/
	booktype: {
		type: String,
		default: ''
	},
	date: {
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

mongoose.model('Addbook', AddbookSchema);