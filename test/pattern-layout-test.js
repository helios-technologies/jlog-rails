var id = 0;

buster.testCase("Check pattern layout", {
  setUp: function() {
    JLog.errorHandler = function(error) { throw error };
  },

  tearDown: function() {
  },

  "Basic layout": function() {
    var pl = new JLog.PatternLayout("%m%n");
    var res = pl.format(new JLog.LoggingEvent(null, new Date(), JLog.Level.INFO, ["hello"], null));
    assert.equals("hello\n", res, "just message with new line");
  },

  "Custom fields": function() {
    var pl = new JLog.PatternLayout("%f{left} %m %f{right}");
    pl.setCustomField("left", "<<");
    pl.setCustomField("right", ">>");
    var res = pl.format(new JLog.LoggingEvent(null, new Date(), JLog.Level.INFO, ["whats up?"], null));
    assert.equals("<< whats up? >>", res, "message with custom fields");
  },

  "Logger name and Level": function() {
    var pl = new JLog.PatternLayout("%c [%p] %m");
    var res = pl.format(new JLog.LoggingEvent(JLog.getLogger("hi-log"), new Date(),
                                              JLog.Level.INFO, ["msg-msg"], null));
    assert.equals("hi-log [INFO] msg-msg", res, "Logger name and Level has to be printed");
  },

  "Startup time": function() {
    var pl = new JLog.PatternLayout("%r");
    var res = pl.format(new JLog.LoggingEvent(null, new Date(), JLog.Level.INFO, ["msg-msg"], null));
    assert(/\d+/.test(res), "Startup time has to be printed");
  }
});
