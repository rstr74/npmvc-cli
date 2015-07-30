var child_process = require('child_process');
var prompt = require('prompt');
module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.InstallNpmvcCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.InstallNpmvcCommand',
			parent: puremvc.AsyncCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				if (npmvc.cli.AppConstants.ENABLE_NPM_INSTALLS === true) {
					var install_package = this.note;
					var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);
					var config = model.getStartUpValues();
					var root = config.data.extra.root;
					var kickstarterpath = config.data.extra.path;
					var self = this;

					child_process.execFile('npm', ['install', '--prefix', kickstarterpath, install_package], function(error, stdout, stderr) {
						if (error instanceof Error) {
							process.stderr.write(stderr);
							self.fail(install_package);
						} else {
							process.stdout.write(stdout);
							self.succes(install_package);
						}
						
					}.bind(this));
				} else {
				prompt.start();
				self = this;
				prompt.get([{
					name: (' install success, Press enter to continue...'.green),
					required: false
				}], function(err, result) {
					self.commandComplete(); //self.facade.sendNotification("NPM_INSTALL_SUCCESS");
				});
					
				}
			},
			succes: function(install_package) {
				prompt.start();
				self = this;
				prompt.get([{
					name: (install_package + ' install success, Press enter to continue...').green,
					required: false
				}], function(err, result) {
					self.commandComplete(); //self.facade.sendNotification("NPM_INSTALL_SUCCESS");
				});
			},
			fail: function(install_package) {
				prompt.start();
				self = this;
				prompt.get([{
					name: (install_package + ' install failed, Press enter to continue...').red,
					required: false
				}], function(err, result) {
					self.commandComplete();
					//self.facade.sendNotification("NPM_INSTALL_ERROR");
				});
			}
		});
}