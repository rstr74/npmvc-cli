var path = require('path');
var fs = require('fs');

module.exports = function(include, puremvc) {

	include("model/StartUpProxy");
	include("command/StartCommand");
	include("command/InitPackageCommand");
	/**
	 * @class npmvc.cli.command.LoadPackageCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.LoadPackageCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function(note) {

				this.facade.registerCommand("INIT", npmvc.cli.command.InitPackageCommand);

				this.facade.registerCommand("START", npmvc.cli.command.StartCommand);

				var startUpValueObject = note.body;

				var package_json = startUpValueObject.data.extra.path + "/package.json";
				var self = this;
				if (fs.existsSync(package_json) === true) {
					var pkg = require(package_json);
					if (!pkg.puremvc || !pkg.puremvc.namespace) {
						console.log("namespace is missing, please fill in a namespace.");
						var prompt = require('prompt');
						prompt.start();
						prompt.get([{
							name: 'namespace',
							default: pkg.namespace || "com.domain",
							required: true,
						}], function(err, result) {
							result.puremvc = {
								"namespace": result.namespace
							}

							pkg.puremvc = result.puremvc;

							var callback = function() {
								startUpValueObject.pkg = pkg;
								var startUpProxy = new npmvc.cli.model.StartUpProxy();
								startUpProxy.setStartUpValues(startUpValueObject);
								self.facade.registerProxy(startUpProxy);
								self.sendNotification("START");
							}

							fs.writeFile(package_json, JSON.stringify(pkg, null, 4), function(err) {
								if (err) {
									callback(err);
								} else {
									callback();
								}
							}.bind(this));
						});
					} else {
						startUpValueObject.pkg = pkg;
						var startUpProxy = new npmvc.cli.model.StartUpProxy();
						startUpProxy.setStartUpValues(startUpValueObject);
						self.facade.registerProxy(startUpProxy);
						self.sendNotification("START");
					}

				} else {

						var startUpProxy = new npmvc.cli.model.StartUpProxy();
						startUpProxy.setStartUpValues(startUpValueObject);
						self.facade.registerProxy(startUpProxy);
						this.sendNotification("INIT");
				}
			}
		});
}