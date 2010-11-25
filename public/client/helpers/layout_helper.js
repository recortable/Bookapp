(function($) {
  $$.layout = {
    showInBrowser : function(el) {
      $("#browser-viewport > *").hide();
      el.show();
    }
  }
})(window.jQuery);