var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prompt = require('prompt');
var moment = require('moment');
var dir = require('node-dir');


module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.CreateClassCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.CreateClassCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function(note) {

				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);
				console.log("Create new " + note.body.label + " from template:");
				var config = model.getStartUpValues();
				var pkg = config.pkg;
				var root = config.data.extra.root;
				var kickstarterpath = config.data.extra.path;
				// Markers in templates
				var replace = {
					"NAME_SPACE": pkg.puremvc.namespace,
					"AUTHOR": pkg.author,
					"EMAIL": pkg.email
				};
				var taskObject = {
					"targetPath": kickstarterpath + npmvc.cli.AppConstants.CLASS_TEMPLATE_REG[note.body.label].targetPath,
					"template": npmvc.cli.AppConstants.CLASS_TEMPLATE_REG[note.body.label].template,
					"replace": replace
				};

				var options = {};
				var self = this;

				var prompt = require('prompt');
				prompt.start();
				// output some text to the console as the callback
					prompt.addProperties(options, ['classname'], function(err) {
						console.log(options.classname );
						if (options.classname) {
							taskObject.replace["CLASS_NAME"] = "" + options.classname;
							taskObject.replace["FILE"] = options.classname + ".js";
							taskObject.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");
							self.createFromTemplate({
								"templateFile": root + "/template/" + taskObject.template,
								"targetFile": taskObject.targetPath + options.classname + ".js",
								"data": taskObject.replace
							}, function() {
								console.log(("DONE! >> " + taskObject.targetPath + options.classname + ".js").green);
							});
						} else {
							self.facade.sendNotification("SHOW_DEFAULT_MENU");
						}
					});
				

			},

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
					console.log("> copied file:".green + process.env.PWD.green + data.dst.green);
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
		});

}