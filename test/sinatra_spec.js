var should = require("should"),
    running = require("is-running"),
      sinatra = require("../lib/sinatra");

describe("grunt-sinatra", function(){
  var args = [];
  var opts = {
    pidFile: "/tmp/sinatraServer.pid"
  }

  it("should start the server", function(){
    //code here
    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
  });

  it("should kill the server", function(){
    var pid = sinatra.pid();
    running(pid).should.equal(true);
    sinatra.kill(args, opts);
    setTimeout(function(){
      running(pid).should.equal(false);
    }, 500);
  });

  it("should restart a running server");
  it("should kill the server when the task finishes");

  it("accepts a port argument", function(){
    args = ["-p", "3987"]

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.port().should.equal(3987);
  });

  it("sets the --env flag", function(){
    args = ["--env", "production"]

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.env().should.equal("production");
  });

  it("sets --daemon flag", function(){
    args = ["--daemonize"]

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.daemon().should.equal(true);
  });

  it("sets the --pid flag", function(){
    args = ["--pid", "54392"]

    sinatra.start(args, opts);
    running(sinatra.pid()).should.equal(true);
    sinatra.pid().should.equal(54392);
  });
})
