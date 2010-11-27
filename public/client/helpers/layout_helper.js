(function($) {
  $$.layout = {
    showInBrowser : function(presenter) {
      $("#browser-viewport > *").hide();
      presenter.el.show();
    },
    showInComm : function(presenter) {
      $("#comm-viewport > *").hide();
      presenter.el.show();
    },
    show : function(presenter) {
      $("#content").html(presenter.el);
    },
    clear : function() {
      $("#content").empty();
    }
  }
})(window.jQuery);