// var buster = require("buster");

var id = 0;
buster.testCase("Check room handlers", {
  setUp: function() {
    JLog.handleError = function(error) { throw error };
  },

  tearDown: function() {
  },

  "Check inheritance": function() {
    var hitGirl = JLog.getLogger("bigDaddy.hitGirl");
    var bigDaddy = JLog.getLogger("bigDaddy");
    var rootLogger = JLog.getRootLogger();

    assert.equals(hitGirl.parent, bigDaddy, "Named parent must match");
    assert.equals(bigDaddy.parent, rootLogger, "Root logger has to be parent of base loggers");
  },

  "Logger should evaluate levels": function() {
    var logger = JLog.getLogger("kick-ass");
    logger.setLevel(JLog.Level.WARN);

    var appender = new JLog.ConsoleAppender();
    var stub = sinon.stub(appender, "append");
    logger.addAppender(appender);

    logger.info("hello");
    assert(!stub.called, "INFO is lower then WARN");
    logger.warn("hello");
    assert(stub.called, "WARN should be logged");
  },

  "Check log message propagation": function() {
    var hitGirl = JLog.getLogger("bigDaddy.hitGirl");
    var bigDaddy = JLog.getLogger("bigDaddy");
    hitGirl.setLevel(JLog.Level.ALL);
    bigDaddy.setLevel(JLog.Level.ALL);

    var appender = new JLog.ConsoleAppender();
    var stub = sinon.stub(appender, "append");
    bigDaddy.addAppender(appender);
    hitGirl.error("hello");

    assert(stub.called, "Log message should rich appender");
    stub.restore();
  }
});
