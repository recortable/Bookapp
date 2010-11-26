(function($) {

  $$.CollaboratorsPresenter = Backbone.View.extend({
    initialize : function() {
      this.el = $('#users');
      this.delegateEvents();
    }
  });


})(window.jQuery);