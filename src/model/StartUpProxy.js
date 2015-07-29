/**
* StartUpProxy.js 
* 29-07-2015 13:10
* 
* @author Robbert Streng
* @email undefined
* 
*/

module.exports = function(include, puremvc) {

	include("model/vo/StartUpValueObject");
/**
 * @class npmvc.cli.model.StartUpProxy
 * @extends puremvc.Proxy
 *
 */
puremvc.define(
	// CLASS INFO
	{
		name: "npmvc.cli.model.StartUpProxy",
		parent: puremvc.Proxy
	},
	// INSTANCE MEMBERS 
	{
		/** @override */
		onRegister: function() {
			
		},
		/**
		 * @method init
		 */
		init: function() {
			
			
		},
		setStartUpValues:function(startUpValues) {
			this.data = startUpValues;

			
		},
		getStartUpValues:function(){
			return this.data;
		}
	},
	// STATIC MEMBERS	
	{
		NAME: 'npmvc.cli.model.StartUpProxy',
	});
}
