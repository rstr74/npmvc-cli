'use strict';

module.exports = function(grunt) {
	var fs = require('fs');
	var templatePath = "template/";
	var kickstarterpath = grunt.option("extra").path ;
	var pkg;
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
	grunt.initConfig({
		templating: {
			"boilerplate": [{
				"boilerplate": {
					"boilerplate": "boilerplate",
					"kickstarterpath": kickstarterpath,
					"replace": replace
				}
			}],
			"AppFacade": [{
				"init": {
					"target": kickstarterpath + "/src"+ "/AppFacade.js",
					"template": "AppFacade.js",
					"replace": function() {
						var tmp = replace;
						tmp["FILE_NAME"] = "AppFacade";
						return tmp;
					}()
				}
			}],
			"index": [{
				"init": {
					"target": kickstarterpath + "/src"+ "../index.js",
					"template": "index.js",
					"replace": replace
				}
			}],
			"SimpleCommand": [{
				"class": {
					"targetPath": kickstarterpath + "/src"+ "/command/",
					"template": "command/SimpleCommand.js",
					"replace": replace
				}
			}],
			"MacroCommand": [{
				"class": {
					"targetPath": kickstarterpath + "/src"+ "/command/",
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
					"targetPath": kickstarterpath + "/src"+ "/model/",
					"template": "model/Proxy.js",
					"replace": replace
				}
			}],
			"ValueObject": [{
				"class": {
					"targetPath": kickstarterpath + "/src"+ "/model/vo/",
					"template": "model/ValueObject.js",
					"replace": replace
				}
			}],
			"Mediator": [{
				"class": {
					"targetPath": kickstarterpath + "/src"+ "/mediator/",
					"template": "mediator/Mediator.js",
					"replace": replace
				}
			}],
			"Service": [{
				"class": {
					"targetPath": kickstarterpath + "/src"+ "mediator/service",
					"template": "mediator/Service.js",
					"replace": replace
				}
			}]
		}
	});

	require('./lib/templating')(grunt);
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
	grunt.registerTask('SimpleCommand', ['templating:SimpleCommand']);
	grunt.registerTask('SimpleCommand', ['templating:SimpleCommand']);
};