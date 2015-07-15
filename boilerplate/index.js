/**
* {FILE} 
* {GENERATED}
* 
* @author {AUTHOR}
* @email {EMAIL}
* 
*/

var puremvc = require("npmvc");
puremvc.validateIncludePaths = true;
puremvc.setSourceDir( __dirname + "/src");

puremvc.include("AppFacade");

var facade = {NAME_SPACE}.AppFacade.getInstance({NAME_SPACE}.AppFacade.NAME);
facade.start();