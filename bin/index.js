#!/usr/bin/env node

var path = require('path');
var puremvc = require("npmvc");
puremvc.validateIncludePaths = false;
puremvc.setSourceDir(__dirname + "/../src");

puremvc.include("AppFacade");
puremvc.include("AppConstants");

var facade = npmvc.cli.AppFacade.getInstance(npmvc.cli.AppFacade.NAME);
var startUpValueObject = new npmvc.cli.model.vo.StartUpValueObject({
	gruntfile: path.normalize(__dirname + "/../Gruntfile.js"),
	extra: {
		root:path.normalize(__dirname+"/../"),
		path: process.cwd()
	}
});

facade.start(startUpValueObject);