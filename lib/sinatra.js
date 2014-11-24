'use strict';

var spawn = require('child_process').spawn,
       fs = require('fs'),
   mkdirp = require('mkdirp'),
     path = require('path'),
     kill = require('tree-kill');

var _currentProcess;
var pid;
var port;
var environment;
var daemon;

module.exports.pid = function(){ return pid };
module.exports.port = function(){ return port };
module.exports.environment = function(){ return environment };
module.exports.daemon = function(){ return daemon };

module.exports.serve = function(args, options){
  options = options ||  { pidFile: "/tmp/sinatraServer.pid" };

  _currentProcess = spawn('rackup', args, {
    cwd: options.cwd || process.cwd(),
    stdio: 'ignore'//['ignore', process.stdout, 'ignore']
  });

  pid = _currentProcess.pid;
  console.log("Sinatra server started on port " + port + ". PID: " + pid );

  process.on('exit', function() {
    _currentProcess.kill();
  });
};

module.exports.start = function(args, options) {
  options = options || {};

  _currentProcess = spawn('rackup', args, {
    cwd: options.cwd || process.cwd(),
    stdio: 'ignore'//['ignore', process.stdout, 'ignore']
  });

  pid = _currentProcess.pid;
  mkdirp(path.dirname(options.pidFile), function (err){
    if(err){ throw(err) }
  });
  fs.writeFileSync(options.pidFile, pid);
  console.log("Sinatra server started on port " + port + ". PID: " + pid );
};

module.exports.kill = function(args, options){
  if(!_currentProcess) {
    var _pidFile = options.pidFile;
    if(fs.existsSync(_pidFile)) {
      pid = fs.readFileSync(_pidFile);
    }
  }
  debugger;
  console.log("Killing the process: " + pid);
  spawn('kill', ['-QUIT', pid]); // kill(pid);
  pid = undefined;
  fs.unlinkSync(options.pidFile);
};
