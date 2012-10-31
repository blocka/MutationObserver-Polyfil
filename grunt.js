/*jslint node:true*/

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({
		watch: {
			files: '<config:jslint.files>',
			tasks: 'jslint'
		},

		server: {
			port: 9876,
			base: '.'
		},

		jslint: {
			files: [
				'*.js'
			],
			directives: {
				browser: true,
				unparam: true,
				undef: true
			}
		}

	});

	grunt.registerTask('default', 'server watch');
};
