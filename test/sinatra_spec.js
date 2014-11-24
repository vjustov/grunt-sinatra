var should = require("should"),
   running = require("is-running"),
   sinatra = require("../lib/sinatra"),
        fs = require("fs"),
     sleep = require('sleep');

describe("grunt-sinatra", function(){
  var args = ["fixtures/config.ru"];
  var opts = {
    pidFile: "/tmp/sinatraServer.pid"
  }

  it("should start the server", function(){
    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
  });

  it("should kill the server", function(){
    var pid = sinatra.pid();
    running(pid).should.equal(true);
    console.log("it should be running");
    sinatra.kill(args, opts);
    sleep.sleep(1);
    debugger;
    running(pid).should.equal(false);
  });

  //it("should restart a running server");
  //it("should kill the server when the task finishes");

  it("accepts a port argument", function(){
    args.unshift("-p", "3987")

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.port().should.equal(3987);
  });

  it("sets the --env flag", function(){
    args.unshift("--env", "production")

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.env().should.equal("production");
  });

  it("sets --daemon flag", function(){
    args.unshift("--daemonize")

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.daemon().should.equal(true);
  });

  it("sets the --pid flag", function(){
    args.unshift("--pid", "sinatra.pid")

    sinatra.start(args, opts);

    sleep.sleep(1);
    pid = fs.readFileSync("sinatra.pid", 'utf8');

    running(sinatra.pid()).should.equal(true);
    sinatra.pid().should.equal(pid);
  });
})
