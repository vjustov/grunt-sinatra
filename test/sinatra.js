var should = require("should"),
    running = require("is-running"),
    sinatra = require("../lib/sinatra");

describe("grunt-sinatra", function(){
  it("should run the server", function(){
    //code here
    sinatra.start();
    running(sinatra.pid()).should.equal(true);
  });

  it("should kill the server");
  it("should restart a running server");
  it("should kill the server when the task finishes");
})
