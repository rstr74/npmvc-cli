/**
* HelpCommand.js 
* 29-07-2015 13:03
* 
* @author Robbert Streng
* @email undefined
* 
*/

module.exports = function(include, puremvc) {
		
	// include("...");

	/**
	 * @class npmvc.cli.command.HelpCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.HelpCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);
				this.facade.sendNotification("END_STDIN");
				console.log(model.getStartUpValues());
			}
		});
}