(function() {
  $$ = {};
  $$.VERSION = "0.0.1";

  if (typeof console == "undefined" || typeof console.log == "undefined") {
    window.console = {
      log : function() {
      }
    };
  }

  window.assert = function(value, message) {
    if (!value) {
      console.log("ASSERT FAILED: " + message, value);
      throw "Assert failed: " + message;
    }
  }

  // usage: log('inside coolFunc',this,arguments);
  // paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
  window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console){
      console.log( Array.prototype.slice.call(arguments) );
    }
  };
  
  window.log("boot...");
})();