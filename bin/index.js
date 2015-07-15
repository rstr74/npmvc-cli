#!/usr/bin/env node
var grunt = require("grunt");
grunt.cli({
  gruntfile: __dirname + "/../Gruntfile.js",
  extra: {
  	path: process.cwd()
  }
});