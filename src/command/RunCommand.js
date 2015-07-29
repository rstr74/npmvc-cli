

module.exports = function(include, puremvc) {
		
	// include("...");

	/**
	 * @class npmvc.cli.command.RunCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.RunCommand',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				this.facade.sendNotification("SHOW_DEFAULT_MENU");
			}
		});
}