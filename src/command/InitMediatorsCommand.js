/**
* src/command/InitMediatorsCommand.js 
* 29-07-2015 13:00
* 
* @author Robbert Streng
* @email undefined
* 
*/

module.exports = function(include, puremvc) {
		
	// include("...");

	/**
	 * @class npmvc.cli.command.InitMediatorsCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.InitMediatorsCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				console.log("exec npmvc.cli.command.InitMediatorsCommand");
			}
		});
}