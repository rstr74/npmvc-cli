/**
* {FILE} 
* {GENERATED}
* 
* @author {AUTHOR}
* @email {EMAIL}
* 
*/

module.exports = function(include, puremvc) {
/**
 * @class {NAME_SPACE}.mediator.{CLASS_NAME}
 * @extends puremvc.Mediator
 *
 */
puremvc.define(
	// CLASS INFO
	{
		name: "{NAME_SPACE}.mediator.{CLASS_NAME}",
		parent: puremvc.Mediator
	},

	// INSTANCE MEMBERS
	{
		/** @override */
		listNotificationInterests: function() {
			return []
		},
		/** @override */
		handleNotification: function(note) {
			switch (note.getName()) {
				case "dosomething":
					//DO SOMETHING
					break;
			}
		},
		/**
		 * [init description]
		 * @return {[type]} [description]
		 */
		init: function() {

		},
		/** @override */
		onRegister: function() {
			
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
		NAME: '{NAME_SPACE}.mediator.{CLASS_NAME}'
	});
}