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
							self.commandComplete(); 
						}
						
					}.bind(this));
				} else {
					self.commandComplete(); 
				}
			}
		});
}