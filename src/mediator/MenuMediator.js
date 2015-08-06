//var Menu = require('terminal-menu');
var createMenu = require('simple-terminal-menu');

module.exports = function(include, puremvc) {
	/**
	 * @class npmvc.cli.mediator.MenuMediator
	 * @extends puremvc.Mediator
	 *
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: "npmvc.cli.mediator.MenuMediator",
			parent: puremvc.Mediator
		},

		// INSTANCE MEMBERS
		{
			/** @override */
			listNotificationInterests: function() {
				return [
					"MESSAGE_MENU",
					"CUSTOM_MENU",
					"CREATE_BOILERPLATE",
					"CREATE_CLASS",
					"MENU_SELECT",
					"MENU_CLOSE",
					"SHOW_DEFAULT_MENU",
					"RESET_MENU",
					"CLASS_MENU"
				]
			},
			/** @override */
			handleNotification: function(note) {
				switch (note.getName()) {
					case "MESSAGE_MENU":
						if (this.menu)
							this.menu.close();
						this.messageMenu(note.body);
						break;
					case "CUSTOM_MENU":
						if (this.menu)
							this.menu.close();
						this.showMenu(note.body);
						break;
					case "CREATE_BOILERPLATE":
						if (this.menu)
							this.menu.close();
						break;
					case "MENU_SELECT":
						var label = note.body.label;
						var index = note.body.index;

						var command = this.commands[index];
						if (label != "" || label != null || label != undefined) {
							this.facade.sendNotification(command, {
								label: label
							});
						}

						break;
					case "MENU_CLOSE":

						var type = note.body;
						if (type === "CLASS_MENU") {

						}
						break;
					case "SHOW_DEFAULT_MENU":
						if (this.menu)
							this.menu.close();
						this.showMenu(npmvc.cli.AppConstants.DEFAULT_MENU);
						break;
					case "RESET_MENU":
						this.resetMenu();
						break;
					case "CLASS_MENU":
						this.showMenu(npmvc.cli.AppConstants.CLASS_MENU);
						break;
					case "CREATE_CLASS":
						var label = note.body.label;
						this.facade.sendNotification("CREATE_CLASS_FROM_TEMPLATE", {
							label: label
						});
						break;


				}
			},
			/**
			 * [init description]
			 * @return {[type]} [description]
			 */
			init: function() {

			},
			addCommands: function(command) {
				this.commands.push(command);
			},
			messageMenu: function(options) {
				var self = this;
				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);

				var config = model.getStartUpValues();
				var pkg = config.pkg;
				var root = config.data.extra.root;
				var kickstarterpath = config.data.extra.path;

				function send(command, o) {
					self.facade.sendNotification(command, {
						label: o
					});
				}

				function mMenu() {
					var menu = createMenu();
					var _self = this;
					menu.writeLine(options.HEADER, "");
					menu.writeSeparator()
					for (var m in options.MESSAGES) {
						menu.writeLine(options.MESSAGES[m], "");
					}

					menu.writeSeparator()
					menu.add("BACK", function() {
						self.facade.sendNotification("SHOW_DEFAULT_MENU");
					});

					menu.on('select', function(label) {

					});
					return menu;
				}



				this.menu = mMenu();
			},
			showMenu: function(options) {
				var self = this;
				var model = this.facade.retrieveProxy(npmvc.cli.model.StartUpProxy.NAME);

				var config = model.getStartUpValues();
				var pkg = config.pkg;
				var root = config.data.extra.root;
				var kickstarterpath = config.data.extra.path;

				function send(command, o) {
					self.facade.sendNotification(command, {
						label: o
					});
				}


				function mainMenu() {
					var menu = createMenu()
					menu.writeLine(options.HEADER, pkg.name + " - " + pkg.version);
					menu.writeSeparator()
					var _self = this;
					for (var option in options.OPTIONS) {
						for (var o in options.OPTIONS[option]) {
							(function(command, o) {
								menu.add(o, function() {
									send(command, o);
								});
							}("" + options.OPTIONS[option][o], o));
						}
					}

					menu.writeSeparator();
					if (options.TYPE != "MAIN_MENU") {
						menu.add("BACK", function() {
							self.facade.sendNotification("SHOW_DEFAULT_MENU");
						});

					} else {
						menu.add("EXIT", menu.close);
					}
					menu.on('select', function(label) {

					});
					return menu;
				}

				this.menu = mainMenu();

			},
			end: function() {
				process.stdin.setRawMode(false);
				process.exit();
			},
			resetMenu: function() {
				this.menu.reset();
			},
			/** @override */
			onRegister: function() {
				this.init();
			},
			/** @override */
			onRemove: function() {

			}
		},
		// STATIC MEMBERS
		{
			/**
			 * @static
			 * @type {string}
			 */
			NAME: 'npmvc.cli.mediator.MenuMediator'
		});
}