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
 * @class {NAME_SPACE}.model.vo.{CLASS_NAME}
 *
 */
puremvc.define(
	// CLASS INFO
	{
		name: "{NAME_SPACE}.model.vo.{CLASS_NAME}",
		constructor: function(data) {
			this.data = data;
		}
	},
	// INSTANCE MEMBERS 
	{
		getData:function() {
			return this.data;
		}
	},
	// STATIC MEMBERS	
	{
		NAME: '{NAME_SPACE}.model.vo.{CLASS_NAME}',
	});

}