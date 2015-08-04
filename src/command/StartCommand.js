/**
* src/command/StartCommand.js 
* 29-07-2015 13:00
* 
* @author Robbert Streng
* @email undefined
* 
*/
var say = require('say');
module.exports = function(include, puremvc) {

	include("command/InitModelsCommand");
	include("command/InitMediatorsCommand");
	include("command/InitServiceCommand");
	include("command/InitCommandsCommand");
	include("command/SetupMenuCommand");
	include("command/RunCommand");
	
	/**
	 * @class npmvc.cli.command.StartCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.StartCommand',
			parent: puremvc.MacroCommand
		},
		// INSTANCE MEMBERS
		{
			initializeMacroCommand: function() {
				say.speak('Alex', 'npmvc commandline interface');
				this.addSubCommand(npmvc.cli.command.InitModelsCommand);
				this.addSubCommand(npmvc.cli.command.InitMediatorsCommand);
				this.addSubCommand(npmvc.cli.command.InitServiceCommand);
				this.addSubCommand(npmvc.cli.command.InitCommandsCommand);
				this.addSubCommand(npmvc.cli.command.SetupMenuCommand);
				this.addSubCommand(npmvc.cli.command.RunCommand);
			}
		});

}