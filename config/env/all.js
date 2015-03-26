'use strict';

module.exports = {
	app: {
		title: 'Jeppiaar WebPortal',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
				'public/lib/angular/angular.js',
				'public/lib/ng-file-upload/angular-file-upload.min.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/ng-flow/dist/ng-flow-standalone.js',
				
			]
		},
		css: [
			'public/modules/**/css/*.css',
			'public/vendor/ui-grid-unstable.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/vendor/datetimepicker.js',
			'public/vendor/csv.js',
			'public/vendor/pdfmake.js',
			'public/vendor/vfs_fonts.js',	
			'public/vendor/ui-grid-unstable.js',
			'public/modules/*/*.js',
			'public/modules/*/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};