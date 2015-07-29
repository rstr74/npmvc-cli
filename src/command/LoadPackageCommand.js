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

				this.facade.registerCommand("INIT",npmvc.cli.command.InitPackageCommand);
		
				this.facade.registerCommand("START", npmvc.cli.command.StartCommand);

				var startUpValueObject = note.body;

				var package_json = startUpValueObject.data.extra.path + "/package.json";

				if (fs.existsSync(package_json) === true) {
					var pkg = require(package_json);
					startUpValueObject.pkg = pkg;

				} else {
					startUpValueObject.pkg = false;
				}
				var startUpProxy = new npmvc.cli.model.StartUpProxy();
				startUpProxy.setStartUpValues(startUpValueObject);
				this.facade.registerProxy(startUpProxy);

				if (startUpValueObject.pkg === false) {
					this.sendNotification("INIT");
					
				} else {
					this.sendNotification("START");
				}
			}
		});
}