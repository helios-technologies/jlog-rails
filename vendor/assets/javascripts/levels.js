JLog.Level = (function() {
  function Level(priority, name) {
    this.priority = priority;
    this.name = name;
  };

  Level.prototype = {
    isGreaterOrEqual: function(otherLevel) {
      return this.priority >= otherLevel.priority;
    }
  };

  Level.ALL   = new Level(0, "ALL");
  Level.DEBUG = new Level(1, "DEBUG");
  Level.INFO  = new Level(2, "INFO");
  Level.WARN  = new Level(3, "WARN");
  Level.ERROR = new Level(4, "ERROR");
  Level.FATAL = new Level(5, "FATAL");
  Level.NONE  = new Level(6, "NONE");

  return Level;
})();
