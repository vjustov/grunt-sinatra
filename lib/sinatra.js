'use strict';

var spawn = require('child_process').spawn,
    ps = require('ps-node'),
    running = require('is-running');

var _currentProcess;

module.exports.start = function(options){
  options = options || {};
  _currentProcess = spawn('rackup', [], {
    cwd: options.cwd || process.cwd(),
    stdio: 'inherit'//['ignore', process.stdout, 'ignore']
  });

  process.on('exit', function() {
    _currentProcess.kill();
  });
};

module.exports.kill = function(options){
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

}
