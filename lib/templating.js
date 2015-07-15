'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var prompt = require('prompt');
var moment = require('moment');
var dir = require('node-dir');

module.exports = (function(grunt) {

	function Templating() {

	}
	Templating.prototype = {
		/*
		 *	data.targetFile
		 *	data.templateFile
		 *	data.data object hashmap for replacing markers
		 */
		createFromTemplate: function(data, done) {
			if (!done) {
				var done = function() {};
			}


			var ready = function() {
				done();
			}
			var template = fs.readFileSync("" + data.templateFile, 'utf8');
			var content = template;

			for (var find in data.data) {

				var re = new RegExp("{" + find + "}", "g");
				content = content.replace(re, data.data[find], content);
			}

			mkdirp(path.dirname(path.normalize(data.targetFile)), "0777",
				function(err) {


					if (err) {
						return false;
					} else {
						fs.writeFile("" + data.targetFile, content, ready);
						return true;
					}
				});
		},
		/*
		 *	data.src path to source
		 *	data.dest path to destination / target file
		 */
		copyFile: function(data) {
			var cbCalled = false;

			var ready = function(err) {
				//grunt.log.writeln(path.normalize(taskObj.template));
				grunt.log.writeln("> copied file:".green + process.env.PWD.green + data.dst.green);
			}

			var rd = fs.createReadStream(data.src);
			rd.on("error", function(err) {
				ready(err);
			});


			mkdirp(path.dirname(data.dst), "0777", function(err) {
				if (err) {
					return false;
				} else {
					var wr = fs.createWriteStream(data.dst);
					wr.on("error", function(err) {
						ready(err);
					});
					wr.on("close", function(ex) {
						ready();
					});
					rd.pipe(wr);
					return true;
				}
			});
		}
	}

	grunt.registerMultiTask('templating', 'Copy files and replace markers from custom templates.', function() {

		var templating = new Templating();
		var options = this.options({
			"classname": grunt.option("classname")
		});


		var doneScope = this;
		this.data.forEach(function(taskObjectWrapper) {

			for (var task in taskObjectWrapper) {

				var taskObject = taskObjectWrapper[task];

				switch (task) {
					case "boilerplate":
						var done = doneScope.async();

						var bpath = path.normalize(__dirname + "/../boilerplate/");
						dir.readFiles(bpath,{exclude: /^\./},
							function(err, content, filename, next) {
								
								var res = filename.replace(bpath, "");
								taskObject.replace["FILE"] = res;
								taskObject.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");
								taskObject.replace["FILE_NAME"] = taskObject.replace["CLASS_NAME"] =path.basename(res,".js");
								grunt.log.writeln(res.green);
								templating.createFromTemplate({
									"templateFile": filename,
									"targetFile": path.normalize(taskObject.kickstarterpath + "/"+ res),
									"data": taskObject.replace
								}, next);
							},
							function(err, files) {
								if (err) throw err;
								grunt.log.writeln('done'.green);
								done()
						});

						break;
					case "class":

						var done = doneScope.async();
						if (!options.classname) {
							grunt.log.writeln("Set class name:");
							prompt.addProperties(options, ['classname'], function(err) {
								taskObject.replace["CLASS_NAME"] = "" + options.classname;
								taskObject.replace["FILE"] = options.classname + ".js";
								taskObject.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");
								templating.createFromTemplate({
									"templateFile": __dirname + "/../template/" + taskObject.template,
									"targetFile": taskObject.targetPath + options.classname + ".js",
									"data": taskObject.replace
								}, done);
							});
						}
						break;
					case "init":
						var execute = function(taskObj) {
							var done = doneScope.async();
							taskObj.replace["FILE"] = path.basename(taskObj.target);
							taskObj.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");


							templating.createFromTemplate({
								"templateFile": __dirname + "/../template/" + taskObj.template,
								"targetFile": path.normalize(taskObj.target),
								"data": taskObj.replace
							}, done);
						}
						if (grunt.util.kindOf(taskObject) === 'array') {
							taskObject.forEach(function(taskObjectElement) {
								execute(taskObjectElement);
							});
						} else {
							execute(taskObject);
						}
						break;
					case "template":
						var execute = function(taskObj) {
							var done = doneScope.async();
							taskObj.replace["FILE"] = path.basename(taskObj.target);
							taskObj.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");


							templating.createFromTemplate({
								"templateFile": path.normalize(taskObj.template),
								"targetFile": path.normalize(taskObj.target),
								"data": taskObj.replace
							}, done);
						}
						if (grunt.util.kindOf(taskObject) === 'array') {
							taskObject.forEach(function(taskObjectElement) {
								execute(taskObjectElement);
							});
						} else {
							execute(taskObject);
						}
						break;
					case "copy":
						var execute = function(taskObj) {
							var done = doneScope.async();
							templating.copyFile({
								src: taskObj.src,
								dst: taskObj.dst
							}, done);
						};
						if (grunt.util.kindOf(taskObject) === 'array') {
							taskObject.forEach(function(taskObjectElement) {
								execute(taskObjectElement);
							});
						} else {
							execute(taskObject);
						}

						break;
					case "folder":
						var execute = function(taskObj) {
							var done = doneScope.async();
							mkdirp(taskObj.path, "0777", done);
						};
						if (grunt.util.kindOf(taskObject) === 'array') {
							taskObject.forEach(function(taskObjectElement) {
								execute(taskObjectElement);
							});
						} else {
							execute(taskObject);
						}
						break;
					default:
						grunt.log.writeln("unknown command: ".red);
						break;
				}
			}
		});

	});
});