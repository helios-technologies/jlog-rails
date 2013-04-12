JLog.getExceptionMessage = function(ex) {
  if (ex.message) {
    return ex.message;
  } else if (ex.description) {
    return ex.description;
  } else {
    return String(ex);
  }
};

// Gets the portion of the URL after the last slash
JLog.getUrlFileName = function (url) {
  var lastSlashIndex = Math.max(url.lastIndexOf("/"), url.lastIndexOf("\\"));
  return url.substr(lastSlashIndex + 1);
};

JLog.showStackTraces = true;
JLog.newLine = "\n";

// Returns a nicely formatted representation of an error
JLog.getExceptionStringRep = function (ex) {
  if (ex) {
    var exStr = "Exception: " + JLog.getExceptionMessage(ex);
    try {
      if (ex.lineNumber) {
        exStr += " on line number " + ex.lineNumber;
      }
      if (ex.fileName) {
        exStr += " in file " + JLog.getUrlFileName(ex.fileName);
      }
    } catch (localEx) {
    }
    if (JLog.showStackTraces && ex.stack) {
      exStr += JLog.newLine + "Stack trace:" + JLog.newLine + ex.stack;
    }
    return exStr;
  }
  return null;
};
