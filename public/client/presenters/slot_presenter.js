(function($) {
  $$.SlotPresenter = Backbone.View.extend({
    events : {
      "click": "openEditor",
      "click .cancel" : "closeEditor",
      "click .submit" : "saveEditor"
    },
    initialize : function(options) {
      _.bindAll(this, 'render');
      this.options = options;
      this.el = $$.make('div', 'slot');
      this.open = false;
      this.delegateEvents();
    },
    render : function() {
      return true;
    },
    openEditor : function() {
      if (!this.open) {
        $(this.el).append($$.render.clip_editor(this.options)).addClass('open');
        this.open = true;
      }
    },
    closeEditor : function() {
      if (this.open) {
        $(this.el).empty().removeClass('open');
        this.open = false;
      }
    },
    saveEditor : function() {
      var body = this.$(".body").val();
      var params = this.options.before_id ? {before : this.options.before_id} : {}
      new $$.Operation({
        repository_id : this.options.repository_id,
        operation : {
          model : 'Paragraph',
          action : 'create',
          body : body,
          params : params
        }
      }).create();
      this.closeEditor();
    }
  });
})(jQuery);