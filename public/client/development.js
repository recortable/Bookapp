(function() {
  window.log = function() {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    console.log( Array.prototype.slice.call(arguments) );
  };

  window.assert = function(value, message) {
    if (!value) {
      log("ASSERT FAILED: " + message, value);
      throw "Assert failed: " + message;
    }
  };
})();