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

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // grunt.registerTask('rails:server:restart', ['rails:server:kill', 'rails:server:start']);

  grunt.registerTask('sinatra', 'Control your sinatra server via Grunt', function(command) {

    command = command || 'start';

    var args = [];

    var options = this.options();

    if(grunt.util._.has(options, "port")) {
      args.push("-p", options.port);
    }

    if(grunt.util._.has(options, "daemon")) {
      args.push("--daemonize");
    }

    if(grunt.util._.has(options, "debugger")) {
      args.push("--debug");
    }

    if(grunt.util._.has(options, "environment")) {
      args.push("--env", options.environment);
    }

    if(grunt.util._.has(options, "pid")) {
      args.push("--pid", options.pid);
      //_pidFile = options.pid;
    }

    switch(command) {
      case 'serve':
        sinatra.serve(args, opts);
        break;
      case 'start':
        sinatra.start(args, opts);
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
