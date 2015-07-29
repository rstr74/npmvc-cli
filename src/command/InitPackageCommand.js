var prompt = require('prompt');
var path = require('path');
var fs = require('fs');
module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.InitPackageCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.InitPackageCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {

				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);

				var config = model.getStartUpValues();
				var pkg = config.pkg;
				var root = config.data.extra.root;
				var kickstarterpath = config.data.extra.path;
				//
				// Start the prompt
				//
				prompt.start();
				// config.pkg = {test:"haha"}
				// console.log(model.getStartUpValues());
				// return;
				self = this;
				console.log("No package.json, please provide info:");
				//
				// Get two properties from the user: username and password
				//
				prompt.get([{
					name: 'name',
					required: true,
					default: path.basename(kickstarterpath),
				}, {
					name: 'namespace',
					default: "com.domain",
					required: true,
				}, {
					name: 'version',
					pattern: /^(\d+\.\d+\.\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/,
					default: "1.0.0",
					required: true,
				}, {
					name: 'description',
					required: false,
					default: "",
				}, {
					name: 'keywords',
					required: false,
					default: "",
				}, {
					name: 'author',
					required: false,
					default: "",
				}, {
					name: 'email',
					required: false,
					default: "",
				}], function(err, result) {
					result.puremvc = {
						"namespace": result.namespace
					}
					result.main = "index.js";
					result.license = "MIT";
					result.dependencies = {
						"npmvc": ">=1.0.6"
					}
					result.licenses = [{
						"type": "MIT",
						"url": "http://opensource.org/licenses/mit-license.php"
					}];
					
					var callback = function() {
						config.pkg = result;
						self.facade.sendNotification("START");
					}
					var package_json = kickstarterpath + "/package.json";
					fs.writeFile(package_json, JSON.stringify(result, null, 4), function(err) {
						if (err) {
							callback(err);
						} else {
							callback();
						}
					}.bind(this));
					//console.log(JSON.stringify(result, null, 4));
				});
			}
		});
}