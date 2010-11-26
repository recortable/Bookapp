(function() {
  $$.Util = {
    isNumber : function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    join : function() {
      var result = "";
      for (var index = 0; index < arguments.length; index++) {
        result += arguments[index].toString();
      }
      return result;
    }
  }
})();