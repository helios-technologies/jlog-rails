var id = 2;
buster.testCase("Check ajax appender", {
  setUp: function() {
    JLog.handleError = function(error) { throw error };
    this.timeout = 2000;
  },

  tearDown: function() {
  },

  "Check timeout": function() {
    sinon.stub($, "ajax");
    var aa = new JLog.AjaxAppender("/catcher");
    aa.append(new JLog.LoggingEvent(null, new Date(), JLog.Level.INFO, "hello", null));
    var d = when.defer();
    setTimeout(function() {
      assert($.ajax.calledOnce, "Data has to be sent");
      d.resolver.resolve();
    }.bind(this), 1300)
    return d.promise;
  }
});
