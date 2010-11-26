(function() {
  $$ = {};
  $$.VERSION = "0.0.1";

  if (typeof console == "undefined" || typeof console.log == "undefined") {
    window.console = {
      log : function() {
      }
    };
  }

  window.log = function() {
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
      console.log( Array.prototype.slice.call(arguments) );
    }
  };

  window.assert = function(value, message) {
    if (!value) {
      log("ASSERT FAILED: " + message, value);
      throw "Assert failed: " + message;
    } else {
  //log("ASSERT PASSED: " + message, value);
  }
  };
  
  window.log("boot...");
})();