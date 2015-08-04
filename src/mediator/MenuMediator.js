//var Menu = require('terminal-menu');
var createMenu = require('simple-terminal-menu');
var say = require('say');
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
			messageMenu:function(options) {
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
					menu.writeLine(options.HEADER,"");
					menu.writeSeparator()
					for (var m in options.MESSAGES) {
							menu.writeLine(options.MESSAGES[m],"");
					}
					
					menu.writeSeparator()
					menu.add("BACK", function() {
						self.facade.sendNotification("SHOW_DEFAULT_MENU");
					});

					menu.on('select', function (label) {
							say.speak('Alex', label);
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

					}else {
						menu.add("EXIT",menu.close);
					}
					menu.on('select', function (label) {
							say.speak('Alex', label);
					});
					return menu;
				}



				this.menu = mainMenu();

			},
			__showMenu: function(options) {


				function showSelection(label, marker) {
					console.log("label: " + label + "; marker: " + marker + ";")
					var prompt = require('prompt');
					var options = {};
					var self = this;

					prompt.start();
					prompt.addProperties(options, ['classname'], function(err) {
						console.log("DONE!");
						// taskObject.replace["CLASS_NAME"] = "" + options.classname;
						// taskObject.replace["FILE"] = options.classname + ".js";
						// taskObject.replace["GENERATED"] = moment().format("DD-MM-YYYY HH:mm");
						// self.createFromTemplate({
						// 	"templateFile": __dirname + "/../template/" + taskObject.template,
						// 	"targetFile": taskObject.targetPath + options.classname + ".js",
						// 	"data": taskObject.replace
						// }, function() {

						// 	console.log("DONE!");

						// });
					});
				}

				function mainMenu() {
					var menu = createMenu()
					menu.writeLine("My Menu", "(tm)")
					menu.writeSeparator()
					menu.add("A", "[selected]", showSelection)
					menu.add("B", showSelection)
					menu.writeSeparator()
					menu.add("open submenu", subMenu)
					menu.add("exit", menu.close)
				}

				function subMenu() {
					var menu = createMenu()
					menu.writeLine("SubMenu")
					menu.writeSeparator()
					menu.add("C", "[selected]", showSelection)
					menu.add("D", showSelection)
					menu.writeSeparator()
					menu.add("cancel", mainMenu)
					menu.add("exit", menu.close)
				}

				mainMenu()
			},
			_showMenu: function(options) {
				this.commands = [];
				this.menu = Menu({
					width: npmvc.cli.AppConstants.MENU_WIDTH,
					x: npmvc.cli.AppConstants.MENU_X,
					y: npmvc.cli.AppConstants.MENU_Y,
				});
				this.menu.reset();
				this.menu.write(options.HEADER + '\n');
				this.menu.write('\n');

				for (var option in options.OPTIONS) {
					for (var o in options.OPTIONS[option]) {
						this.addCommands(options.OPTIONS[option][o]);
						this.menu.add(o);

					}
				}

				var self = this;
				this.menu.on('select', function(label, index) {
					self.menu.close();
					self.facade.sendNotification("MENU_SELECT", {
						label: label,
						index: index
					});

				});

				process.stdin.pipe(this.menu.createStream()).pipe(process.stdout);
				process.stdin.setRawMode(true);

				this.menu.on('close', function() {
					self.facade.sendNotification("MENU_CLOSE", options.TYPE);
				});
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