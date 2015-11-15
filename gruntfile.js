module.exports = function(grunt) {

	grunt.initConfig({
		raml2html : {
			all : {
				options : {
					
				},
				files : {
					'doc/dest/api.html' : ['doc/src/api.raml']
				},
				default : {
					
				}
			}
		}
	});

  grunt.loadNpmTasks('grunt-raml2html');

  grunt.registerTask('apidoc', ['raml2html']);

};