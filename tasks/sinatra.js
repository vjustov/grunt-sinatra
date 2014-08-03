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
    var opts = this.options();
    opts.pidFile = opts.pidFile || "/tmp/sinatraServer.pid";

    if(grunt.util._.has(opts, "port")) {
      args.push("-p", opts.port);
    }

    if(grunt.util._.has(opts, "daemon")) {
      args.push("--daemonize");
    }

    if(grunt.util._.has(opts, "debugger")) {
      args.push("--debug");
    }

    if(grunt.util._.has(opts, "environment")) {
      args.push("--env", opts.environment);
    }

    if(grunt.util._.has(opts, "pid")) {
      args.push("--pid", opts.pid);
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
        sinatra.kill(args, opts);
        break;
    }

  });

};
