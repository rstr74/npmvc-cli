/**
* {FILE} 
* {GENERATED}
* 
* @author {AUTHOR}
* @email {EMAIL}
* 
*/

module.exports = function(include, puremvc) {
		
	// include("...");

	/**
	 * @class {NAME_SPACE}.command.{CLASS_NAME}
	 */
	puremvc.define(
		// CLASS INFO
		{
			name: '{NAME_SPACE}.command.{CLASS_NAME}',
			parent: puremvc.SimpleCommand
		},
		// INSTANCE MEMBERS
		{
			execute: function() {
				console.log("exec {NAME_SPACE}.command.{CLASS_NAME}");
				console.log({NAME_SPACE}.AppConstants.SOME_CONSTANT);
			}
		});
}