/**
 * ExecPureMVCBoilerPlateCommand.js 
 * 30-07-2015 15:00
 * 
 * @author Robbert Streng
 * @email undefined
 * 
 */

module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.ExecPureMVCBoilerPlateCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.ExecPureMVCBoilerPlateCommand',
			parent: puremvc.AsyncMacroCommand
		},
		// INSTANCE MEMBERS
		{
			initializeAsyncMacroCommand: function() {
				this.addSubCommand(npmvc.cli.command.CreateBoilerPlateCommand);
				this.addSubCommand(npmvc.cli.command.InstallNpmvcCommand,"npmvc");
			},
			onComplete: function() {
				this.facade.sendNotification("SHOW_DEFAULT_MENU");
			}
		});

}