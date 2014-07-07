/*
 * grunt-sinatra
 * https://github.com/vjustov/grunt-sinatra
 *
 * Copyright (c) 2014 Victor Justo
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var spawn = require('child_process').spawn,
      sinatra = require('../lib/sinatra');
  var _currentProcess;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // grunt.registerTask('rails:server:restart', ['rails:server:kill', 'rails:server:start']);

  var _pidFile = "tmp/pids/server.pid";

  grunt.registerTask('sinatra', 'Control your sinatra server via Grunt', function(name, command) {

    command = command || 'start';

    var args = [];

    var options = this.options();

    if(grunt.util._.has(options, "port")) {
      args.push("-p", options.port);
    }

    if(grunt.util._.has(options, "binding")) {
      args.push("-b", options.binding);
    }

    if(grunt.util._.has(options, "config")) {
      args.push("-c", options.config);
    }

    if(grunt.util._.has(options, "daemon")) {
      args.push("--daemon");
    }

    if(grunt.util._.has(options, "debugger")) {
      args.push("--debugger");
    }

    if(grunt.util._.has(options, "environment")) {
      args.push("-e", options.environment);
    }

    if(grunt.util._.has(options, "pid")) {
      _pidFile = options.pid;
    }

    switch(command) {
      case 'start':
        sinatra.start();
        break;
      case 'restart':
        if(_currentProcess) {

          _currentProcess.on('close', function() {
            _currentProcess = spawn(args, {
              stdio: 'inherit'
            });
          });

          _currentProcess.kill('SIGQUIT');
        } else {
          if(grunt.file.exists(_pidFile)) {
            var killArgs = ['-s', 'QUIT', grunt.file.read(_pidFile)];
            var killTask = spawn('kill', killArgs, {
              stdio: 'ignore'
            });

            // args.unshift('server');
            _currentProcess = spawn(args, {
              stdio: ['ignore', process.stdout, 'ignore']
            });
          }
        }
        break;
      case 'kill':
        if(_currentProcess) {
          _currentProcess.kill('QUIT');
        } else {
          if(grunt.file.exists(_pidFile)) {
            args = ['-s', 'QUIT', grunt.file.read(_pidFile)];
          }
          spawn('kill', args, {
            stdio: 'inherit'
          });
        }
        break;
    }

  });

};
