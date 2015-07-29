/**
* StartUpValueObject.js 
* 29-07-2015 13:11
* 
* @author Robbert Streng
* @email undefined
* 
*/

module.exports = function(include, puremvc) {
/**
 * @class npmvc.cli.model.vo.StartUpValueObject
 *
 */
puremvc.define(
	// CLASS INFO
	{
		name: "npmvc.cli.model.vo.StartUpValueObject",
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
		NAME: 'npmvc.cli.model.vo.StartUpValueObject',
	});

}