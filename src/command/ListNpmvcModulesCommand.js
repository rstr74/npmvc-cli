var prompt = require('prompt');

module.exports = function(include, puremvc) {

	include("command/ListNpmvcModulesExecuteCommand");

	/**
	 * @class npmvc.cli.command.ListNpmvcModulesCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.ListNpmvcModulesCommand',
			parent: puremvc.AsyncMacroCommand
		},
		// INSTANCE MEMBERS
		{
		
			initializeAsyncMacroCommand: function() {
				this.addSubCommand(npmvc.cli.command.ListNpmvcModulesExecuteCommand);
			},
			onComplete: function() {
				// prompt.start();
				// self = this;
				// prompt.get([{
				// 	name: ('Press enter to continue...'.green),
				// 	required: false
				// }], function(err, result) {
				// 	self.facade.sendNotification("SHOW_DEFAULT_MENU"); //self.facade.sendNotification("NPM_INSTALL_SUCCESS");
				// });
					
				// }
			}
		});
}