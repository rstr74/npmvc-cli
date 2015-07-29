
/**
 * SetupMenuCommand.js 
 * 29-07-2015 13:27
 * 
 * @author Robbert Streng
 * @email undefined
 * 
 */

module.exports = function(include, puremvc) {

	include("mediator/MenuMediator");

	/**
	 * @class npmvc.cli.command.SetupMenuCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.SetupMenuCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				this.facade.registerMediator(new npmvc.cli.mediator.MenuMediator());
			}
		});
}