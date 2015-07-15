/**
* {FILE} 
* {GENERATED}
* 
* @author {AUTHOR}
* @email {EMAIL}
* 
*/

module.exports = function(include, puremvc) {

	include("command/InitModelsCommand");
	include("command/InitMediatorsCommand");
	include("command/InitServiceCommand");
	include("command/InitCommandsCommand");
	include("command/RunCommand");
	
	/**
	 * @class {NAME_SPACE}.command.{CLASS_NAME}
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: '{NAME_SPACE}.command.{CLASS_NAME}',
			parent: puremvc.MacroCommand
		},
		// INSTANCE MEMBERS
		{
			initializeMacroCommand: function() {
				console.log("exec {NAME_SPACE}.command.{CLASS_NAME}");
				this.addSubCommand({NAME_SPACE}.command.InitModelsCommand);
				this.addSubCommand({NAME_SPACE}.command.InitMediatorsCommand);
				this.addSubCommand({NAME_SPACE}.command.InitServiceCommand);
				this.addSubCommand({NAME_SPACE}.command.InitCommandsCommand);
				this.addSubCommand({NAME_SPACE}.command.RunCommand);
			}
		});

}