var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prompt = require('prompt');
var moment = require('moment');
var dir = require('node-dir');

module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.CreateModuleCodeCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.CreateModuleCodeCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function(note) {

				var root = process.cwd() + "/node_modules/" + note.body.label.split("@")[0];
				var packageJsonFile = root + "/package.json";
				if (fs.existsSync(packageJsonFile)) {
					var data = fs.readFileSync(packageJsonFile);

					var json = JSON.parse(data);
					if (json.puremvc != undefined) {
						console.log('"' + json.name + '": "' + json.version + '",');
						var menu_entry = {};
						if (!json.puremvc.template) {
							return;
						} else {
							console.log(json.puremvc.template);
						}

					}
				}
				console.log(note.body);

				var templateObject = json.puremvc.template;

				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);
				console.log("Create new " + note.body.label + " from template:");
				var config = model.getStartUpValues();
				var pkg = config.pkg;

				var kickstarterpath = config.data.extra.path;


				// Markers in templates
				var replace = {
					"NAME_SPACE": pkg.puremvc.namespace,
					"AUTHOR": pkg.author,
					"EMAIL": pkg.email
				};

				var classname = templateObject.template;
				var taskObject = {
					"targetPath": kickstarterpath + templateObject.targetPath,
					"template": templateObject.template,
					"replace": replace
				};

				taskObject.replace["CLASS_NAME"] = "" + classname;
				taskObject.replace["FILE"] = classname + ".js";
				taskObject.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");

				if (!fs.existsSync(taskObject.targetPath)) {
					this.createFromTemplate({
						"templateFile": root + "/template/" + taskObject.template + ".js",
						"targetFile": taskObject.targetPath,
						"data": taskObject.replace
					});
					
				} else {
					var menu = {
						TYPE: "MESSAGE",
						HEADER: "ERROR: FILE EXIST ALREADY!",
						MESSAGES: [
							"Please remove ",classname," to save template.", "Press ENTER to go back..."
						]
					}

					this.facade.sendNotification("MESSAGE_MENU", menu);
				}



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