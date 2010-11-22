(function($) {

  $$.WorkspacePresenter = Backbone.View.extend({
    el : $("#workspace"),

    initialize: function() {
      _.bindAll(this, "showLoading");
      this.loading = $("#working")
    },

    showLoading : function(visible) {
      if (visible)
        this.loading.fadeIn();
      else
        this.loading.fadeOut();
    }
  });


})(window.jQuery);