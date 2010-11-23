(function($) {
  $$.SlotPresenter = Backbone.View.extend({
    events : {
      "click": "openEditor",
      "click .cancel" : "closeEditor"
    },
    initialize : function() {
      _.bindAll(this, 'render');
      this.el = $$.make('div', 'slot');
      this.open = false;
      this.delegateEvents();
    },
    render : function() {
      return true;
    },
    openEditor : function() {
      if (!this.open) {
        $(this.el).append($$.render.clip_editor()).addClass('open');
        this.open = true;
      }
    },
    closeEditor : function() {
      if (this.open) {
        $(this.el).empty().removeClass('open');
        this.open = false;
      }
    }
  });
})(jQuery);