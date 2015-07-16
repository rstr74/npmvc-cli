'use strict';

module.exports = function(grunt) {
	var fs = require('fs');
	var templatePath = "template/";
	var kickstarterpath = grunt.option("extra").path;
	var pkg;


	if (process.argv.length > 2) {
		if (grunt.file.exists(grunt.option("extra").path + '/package.json') == true) {
			pkg = grunt.file.readJSON(grunt.option("extra").path + '/package.json');
		} else {
			grunt.fail.fatal("please add a package.json with 'npm init'.");
		}

		if (!pkg.namespace) {
			grunt.fail.fatal("please add a namespace property to package.json");
		}
		// Markers in templates
		var replace = {
			"NAME_SPACE": pkg.namespace,
			"AUTHOR": pkg.author,
			"EMAIL": pkg.email
		};
	}
	

	grunt.initConfig({
		templating: {
			"boilerplate": [{
				"boilerplate": {
					"boilerplate": "boilerplate",
					"kickstarterpath": kickstarterpath,
					"replace": replace
				}
			}],
			"SimpleCommand": [{
				"class": {
					"targetPath": kickstarterpath + "/src" + "/command/",
					"template": "command/SimpleCommand.js",
					"replace": replace
				}
			}],
			"MacroCommand": [{
				"class": {
					"targetPath": kickstarterpath + "/src" + "/command/",
					"template": "command/MacroCommand.js",
					"replace": replace
				}
			}],
			"Facade": [{
				"class": {
					"targetPath": kickstarterpath + "/src/",
					"template": "Facade.js",
					"replace": replace
				}
			}],
			"Constants": [{
				"class": {
					"targetPath": kickstarterpath + "/src/",
					"template": "Constants.js",
					"replace": replace
				}
			}],
			"Commands": [{
				"class": {
					"targetPath": kickstarterpath + "/src/",
					"template": "Constants.js",
					"replace": replace
				}
			}],
			"Proxy": [{
				"class": {
					"targetPath": kickstarterpath + "/src" + "/model/",
					"template": "model/Proxy.js",
					"replace": replace
				}
			}],
			"ValueObject": [{
				"class": {
					"targetPath": kickstarterpath + "/src" + "/model/vo/",
					"template": "model/ValueObject.js",
					"replace": replace
				}
			}],
			"Mediator": [{
				"class": {
					"targetPath": kickstarterpath + "/src" + "/mediator/",
					"template": "mediator/Mediator.js",
					"replace": replace
				}
			}],
			"Service": [{
				"class": {
					"targetPath": kickstarterpath + "/src" + "mediator/service",
					"template": "mediator/Service.js",
					"replace": replace
				}
			}]
		},
		"options": {
			"help": []

		}
	});

	require('./lib/templating')(grunt);
	grunt.registerMultiTask('options', 'Show options', function() {
		var pkg = grunt.file.readJSON(__dirname+'/package.json');
		grunt.log.ok("npmvc-cli version "+pkg.version+"\n\n");
		grunt.log.subhead("npmvc-cli options:\n");
		var options = [
			"boilerplate",
			"Service",
			"Mediator",
			"ValueObject",
			"Proxy",
			"Commands",
			"Constants",
			"Facade",
			"MacroCommand",
			"SimpleCommand"
		]
		for (var option in options) {
			grunt.log.ok(options[option]);
		}
	});
	
	grunt.registerTask('boilerplate', ['templating:boilerplate']);
	grunt.registerTask('Service', ['templating:Service']);
	grunt.registerTask('Mediator', ['templating:Mediator']);
	grunt.registerTask('ValueObject', ['templating:ValueObject']);
	grunt.registerTask('Proxy', ['templating:Proxy']);
	grunt.registerTask('Commands', ['templating:Commands']);
	grunt.registerTask('Constants', ['templating:Constants']);
	grunt.registerTask('Facade', ['templating:Facade']);
	grunt.registerTask('MacroCommand', ['templating:MacroCommand']);
	grunt.registerTask('SimpleCommand', ['templating:SimpleCommand']);


	grunt.registerTask('default', ["options:help"]);
	
};