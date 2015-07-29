/**
 * src/AppConstants.js 
 * 29-07-2015 13:00
 * 
 * @author Robbert Streng
 * @email undefined
 * 
 */
module.exports = function(include, puremvc) {
	puremvc.define(
		// CLASS INFO
		{
			name: 'npmvc.cli.AppConstants'
		},
		// INSTANCE MEMBERS
		{},
		// CONSTANTS
		{
			MENU_WIDTH: 100,
			MENU_x: 0,
			MENU_y: 0,

			DEFAULT_MENU: {
				TYPE: "MAIN_MENU",
				HEADER: 'NPMVC-CLI OPTIONS:',
				OPTIONS: [
					{'CREATE PUREMVC CLASS':"CLASS_MENU"},
					{'CREATE PROJECT FROM BOILERPLATE':"CREATE_BOILERPLATE"},
					// {'SET TEMPLATE DIRECTORY':"SET_TEMPLATE"},
				]
			},
			CLASS_TEMPLATE_REG:{
					'SimpleCommand':{
						"targetPath": "/src/command/",
						"template": "command/SimpleCommand.js"
					},
					'MacroCommand':{
						"targetPath": "/src/command/",
						"template": "command/MacroCommand.js"
					},
					'Proxy':{
						"targetPath": "/src/model/",
						"template": "model/Proxy.js"
					},
					'ValueObject':{
						"targetPath": "/src/model/vo/",
						"template": "model/ValueObject.js"
					},
					'Mediator':{
						"targetPath": "/src/mediator/",
						"template": "mediator/Mediator.js"
					},
					'Facade':{
						"targetPath":  "/src/",
						"template": "Facade.js"
					},
					'Service':{
						"targetPath": "/src/mediator/",
						"template": "mediator/Service.js"
					}
			},
			CLASS_MENU: {
				TYPE: "CLASS_MENU",
				HEADER: 'CREATE PUREMVC CLASS:',
				OPTIONS: [
					{'SimpleCommand':"CREATE_CLASS"},
					{'MacroCommand':"CREATE_CLASS"},
					{'Proxy':"CREATE_CLASS"},
					{'ValueObject':"CREATE_CLASS"},
					{'Mediator':"CREATE_CLASS"},
					{'Facade':"CREATE_CLASS"},
					{'Service':"CREATE_CLASS"}
				]
			}
		});
}