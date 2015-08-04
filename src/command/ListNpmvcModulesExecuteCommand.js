var fs = require('fs');

module.exports = function(include, puremvc) {

	// include("...");

	/**
	 * @class npmvc.cli.command.ListNpmvcModulesExecuteCommand
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.command.ListNpmvcModulesExecuteCommand',
			parent: puremvc.AsyncCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				var self = this;
				var dirs = fs.readdirSync(process.cwd() + "/node_modules");

				var menu = {
					TYPE: "SUB_MENU",
					HEADER: 'LIST OF LOCAL MODULES:',
					OPTIONS: []
				}
				dirs.forEach(function(dir) {
					if (dir.indexOf(".") !== 0) {
						var packageJsonFile = process.cwd() + "/node_modules/" + dir + "/package.json";
						if (fs.existsSync(packageJsonFile)) {
							var data = fs.readFileSync(packageJsonFile);

							var json = JSON.parse(data);
							console.log('"' + json.name + '": "' + json.version + '",');
							var menu_entry = {};
							menu_entry[json.name+"@"+json.version] = "SHOW_DEFAULT_MENU";
							menu.OPTIONS.push(menu_entry);
						}
					}
				});


				this.facade.sendNotification("CUSTOM_MENU",menu);
				this.commandComplete();
			}
		});
}