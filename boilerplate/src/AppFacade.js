/**
* {FILE} 
* {GENERATED}
* 
* @author {AUTHOR}
* @email {EMAIL}
* 
*/

module.exports = function(include, puremvc) {
    
  include("command/StartCommand");

/**
 * @class {NAME_SPACE}.{FILE_NAME}
 * @extends puremvc.Facade
 */
puremvc.define(
  {
    name: '{NAME_SPACE}.{FILE_NAME}',
    parent: puremvc.Facade
  },
  {
    /**
     * @method start
     * @return {[type]} [description]
     */
    start: function() {
      console.log("{NAME_SPACE}.{FILE_NAME} start");
      this.registerCommand("START", {NAME_SPACE}.command.StartCommand);
      this.sendNotification("START", {});
    }
  },
  {
    /**
     * Retrieve an instance of ApplicationFacade. If one has not yet been
     * instantiated, one will be created for you.
     *
     * @static
     * @param {string} multitonKey
     * @return epuppy.ApplicationFacade
     */
    getInstance: function(multitonKey) {
      // all Facade instances, including Facade subclass instances, are stored
      // on Facade.instanceMap. When implementing you own #getInstance factory
      // method, ensure that follow the general pattern implemented here or else
      // puremvc.Facade#hasCore and puremvc.Facade#removeCore will not work if
      // you ever need to use them.
      var instanceMap = puremvc.Facade.instanceMap;
      instance = instanceMap[multitonKey]; // read from the instance map

      if (instance) // if there is an instance...
        return instance; // return it

      // otherwise create a new instance and cache it on Facade.instanceMap;  
      return instanceMap[multitonKey] = new {NAME_SPACE}.{FILE_NAME}(multitonKey);
    },

    /**
     * @static
     * @type {string}
     */
    NAME: '{NAME_SPACE}.{FILE_NAME}'
  });

}