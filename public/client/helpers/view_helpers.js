(function() {
  $$.helpers = {
    fecha : function(context, fn) {
      return $$.DateTime.toString(fn(this));
    }
  }
})();