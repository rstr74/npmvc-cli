var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var prompt = require('prompt');
var moment = require('moment');
var dir = require('node-dir');

module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.CreateBoilerPlateCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.CreateBoilerPlateCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function(note) {

				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);

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
					"replace": replace
				};
				var options = {};
				var self = this;

				console.log("CREATING BOILERPLATE".yellow);

				var bpath = path.normalize(root + "/boilerplate/");
				dir.readFiles(bpath, {
						exclude: /^\./
					},
					function(err, content, filename, next) {

						var res = filename.replace(bpath, "");
						taskObject.replace["FILE"] = res;
						taskObject.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");
						taskObject.replace["FILE_NAME"] = taskObject.replace["CLASS_NAME"] = path.basename(res, ".js");

						console.log(">> ".green + res.green);

						self.createFromTemplate({
							"templateFile": filename,
							"targetFile": path.normalize(kickstarterpath + "/" + res),
							"data": taskObject.replace
						}, next);
					},
					function(err, files) {
						if (err) throw err;
						console.log('DONE!'.green);
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