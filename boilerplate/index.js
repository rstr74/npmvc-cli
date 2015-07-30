/**
* {FILE} 
* {GENERATED}
* 
* @author {AUTHOR}
* @email {EMAIL}
* 
*/

var puremvc = require("npmvc");
puremvc.validateIncludePaths = false;
puremvc.setSourceDir( __dirname + "/src");

puremvc.include("AppFacade");
puremvc.include("AppConstants");

var facade = {NAME_SPACE}.AppFacade.getInstance({NAME_SPACE}.AppFacade.NAME);
facade.start();