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
})
