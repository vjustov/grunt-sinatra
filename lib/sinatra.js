'use strict';

var spawn = require('child_process').spawn;

var _currentProcess;

module.exports.start = function(options){
  options = options || {};

  _currentProcess = spawn('rackup', [], {
    cwd: options.cwd || process.cwd(),
    stdio: 'ignore'//['ignore', process.stdout, 'ignore']
  });
  console.log("Sinatra server started on port 9292. PID: " + _currentProcess.pid );

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
