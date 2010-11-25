(function() {
  $$.Util = {
    isNumber : function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  }
})();