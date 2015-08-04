/**
* src/command/InitCommandsCommand.js 
* 29-07-2015 13:00
* 
* @author Robbert Streng
* @email undefined
* 
*/

module.exports = function(include, puremvc) {
		
	include("command/HelpCommand");
	include("command/CreateClassCommand");
	include("command/CreateBoilerPlateCommand");
	include("command/InstallNpmvcCommand");
	include("command/ExecPureMVCBoilerPlateCommand");
	include("command/ListNpmvcModulesCommand");
	/**
	 * @class npmvc.cli.command.InitCommandsCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.InitCommandsCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
					
				this.facade.registerCommand("LIST_NPM_MODULES",npmvc.cli.command.ListNpmvcModulesCommand);
				this.facade.registerCommand("NPM_INSTALL",npmvc.cli.command.InstallNpmvcCommand);
				this.facade.registerCommand("HELP", npmvc.cli.command.HelpCommand);
				this.facade.registerCommand("CREATE_CLASS_FROM_TEMPLATE", npmvc.cli.command.CreateClassCommand);
				this.facade.registerCommand("CREATE_BOILERPLATE", npmvc.cli.command.ExecPureMVCBoilerPlateCommand);
			}
		});
}