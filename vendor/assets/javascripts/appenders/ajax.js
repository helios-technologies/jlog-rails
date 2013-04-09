/*
  Class: AjaxAppender

  Ajax calls based appender.
*/
JLog.AjaxAppender = function(url) {
  this.name = 'AjaxAppender';

  // Do we make more then 1 call at a time?
  var waitForResponse = true;
  // Current buffer of messages
  var queuedLoggingEvents = [];
  // Messages which should be sent
  var queuedRequests = [];
  // Maximum count of messages sent at a one time
  var batchSize = 10;
  // Are we currently sending something
  var sending = false;
  // Timeout between sending data
  var timerInterval = 1000;

  function scheduleSending() {
    window.setTimeout(sendAllRemaining, timerInterval);
  }

  function sendRequest(postData, callback) {
    $.ajax({
      type: 'POST',
      url: url,
      data: postData,
      dataType: 'json',
      global: false,
      complete: function() {
        if (waitForResponse) sending = false;
        if (callback) callback(true);
      }
    });
  }

  function sendAllRemaining() {
    if (queuedLoggingEvents.length === 0) return;
    var eventCopy = queuedLoggingEvents;
    queuedLoggingEvents = [];
    queuedRequests.push(eventCopy);
    sendAll();
  }

  function preparePostData(data) {
    return { message:data };
  }

  function sendAll() {
    if (waitForResponse && sending) return;
    sending = true;
    var currentRequestBatch;
    if (waitForResponse) {
      if (queuedRequests.length > 0) {
        currentRequestBatch = queuedRequests.shift();
        sendRequest(preparePostData(currentRequestBatch), sendAll);
      } else {
        sending = false;
        scheduleSending();
      }
    } else {
      // Rattle off all the requests without waiting to see the response
      while ((currentRequestBatch = queuedRequests.shift())) {
        sendRequest(preparePostData(currentRequestBatch));
      }
      sending = false;
      scheduleSending();
    }
  }

  scheduleSending();

  /*
    Method: setWaitForResponce

    If ajax appender has to make calls one by one, or it can do then concurrently.

    Parameters:
      waitForResponseParam - if should wait
  */
  this.setWaitForResponse = function(waitForResponseParam) {
    waitForResponse = waitForResponseParam;
  }

  /*
    Method: isWaitForResponse

    Returns if ajax makes calls one at a time.
  */
  this.isWaitForResponse = function() {
    return waitForResponse;
  }

  /*
    Method: setBatchSize

    Set single batch send size.

    Parameters:
      batchSizeParam - new size of batch
  */
  this.setBatchSize = function(batchSizeParam) {
    batchSize = batchSizeParam;
  }

  /*
    Method: getBatchSize

    Return count of messages in batch.
  */
  this.getBatchSize = function() {
    return batchSize;
  }

  /*
    Method: setTimeout

    Set buffering time before sending unfinished batch.

    Parameters:
      timeout - milliseconds
  */
  this.setBatchSize = function(timeout) {
    timerInterval = timeout
  }

  /*
    Method: setTimeout

    Return timeout.
  */
  this.getBatchSize = function() {
    return timerInterval;
  }

  /*
    Method: append

    Attempts to send message.
  */
  this.append = function(msg) {
    queuedLoggingEvents.push({level:msg.level.name, message:this.getLayout().format(msg)});
    if(queuedLoggingEvents.length >= batchSize) sendAllRemaining();
    else if(queuedLoggingEvents.length == 1) scheduleSending();
  }
};

JLog.AjaxAppender.prototype = new JLog.Appender();
