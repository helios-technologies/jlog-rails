
JLog.Appender = function() {};

JLog.Appender.prototype = {
  layout: new JLog.PatternLayout(),
  threshold: JLog.Level.ALL,

  doAppend: function(loggingEvent) {
    if(loggingEvent.level.isGreaterOrEqual(this.threshold)) {
      this.append(loggingEvent);
    }
  },

  append: function(loggingEvent) {},

  setLayout: function(layout) {
    if (layout instanceof JLog.Layout) {
      this.layout = layout;
    } else {
      JLog.handleError("Appender.setLayout: layout supplied to " +
                  this.toString() + " is not a subclass of Layout");
    }
  },

  getLayout: function() { return this.layout; },

  setThreshold: function(threshold) { this.threshold = threshold; },

  getThreshold: function() { return this.threshold; },

  toString: function() {
    JLog.handleError("Appender.toString: all appenders must override this method");
  }
};
