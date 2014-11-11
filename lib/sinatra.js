'use strict';

var spawn = require('child_process').spawn,
               fs = require('fs'),
     mkdirp = require('mkdirp'),
          path = require('path');

var _currentProcess;
var pid;

module.exports.pid = function(){ return pid };
module.exports.serve = function(args, options){
  options = options || {};

  _currentProcess = spawn('bundle exec rackup', args, {
    cwd: options.cwd || process.cwd(),
    stdio: 'ignore'//['ignore', process.stdout, 'ignore']
  });

  pid = _currentProcess.pid;
  console.log("Sinatra server started on port 9292. PID: " + pid );

  process.on('exit', function() {
    _currentProcess.kill();
  });
};

module.exports.start = function(args, options) {
  options = options || {};

  _currentProcess = spawn('bundle exec rackup', args, {
    cwd: options.cwd || process.cwd(),
    stdio: 'ignore'//['ignore', process.stdout, 'ignore']
  });

  pid = _currentProcess.pid;
  mkdirp(path.dirname(options.pidFile), function (err){
    if(err){ throw(err) }
  });
  fs.writeFileSync(options.pidFile, pid);
  console.log("Sinatra server started on port 9292. PID: " + pid );
};

module.exports.kill = function(args, options){
  if(!_currentProcess) {
    var _pidFile = options.pidFile;
    if(fs.existsSync(_pidFile)) {
      pid = fs.readFileSync(_pidFile);
    }
  }
  console.log("Killing the process: " + pid);
  process.kill(pid, 'SIGKILL');
  pid = undefined;
  fs.unlinkSync(options.pidFile);
};
