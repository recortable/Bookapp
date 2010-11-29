(function() {
  $$ = {};
  $$.VERSION = "0.0.1";

  if (typeof console == "undefined" || typeof console.log == "undefined") {
    window.console = {
      log : function() {
      }
    };
  }
  window.console.log("boot...");
})();