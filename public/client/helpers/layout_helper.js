(function($) {
  $$.layout = {
    showInBrowser : function(el) {
      $("#browser-viewport > *").hide();
      el.show();
    },
    showInComm : function(el) {
      $("#comm-viewport > *").hide();
      el.show();
    },
    show : function(presenter) {
      $("#content").html(presenter.el);
    },
    clear : function() {
      $("#content").empty();
    }
  }
})(window.jQuery);