(function($) {

  // SlotPresenter
  $$.SlotPresenter = Backbone.View.extend({
    events : {
      "click": "openEditor",
      "click .cancel" : "closeEditor",
      "submit form" : "saveEditor"
    },
    initialize : function(options) {
      _.bindAll(this, 'render');
      this.options = options;
      this.el = $$.render.slot(this.options);
      this.editor = this.$('.editor');
      this.operations = this.options.operations;
      assert(this.operations, "Operations can't be null in SlotPresenter");
      this.delegateEvents();
    },
    render : function() {
      return true;
    },
    openEditor : function() {
      if (!this.el.hasClass('open')) {
        this.$(".body").val('');
        this.el.addClass('open');
        this.editor.slideDown();
      }
    },
    closeEditor : function() {
      if (this.el.hasClass('open')) {
        var self = this;
        this.editor.slideUp(function() {
          self.el.removeClass('open');
        });
      }
    },
    saveEditor : function() {
      var body = this.$(".body").val();
      var params = this.options.before_id ? {
        before : this.options.before_id
      } : {}
      var operation = new $$.Operation({
        repository_id : this.options.repository_id,
        model : 'Paragraph',
        action : 'create',
        body : body,
        params : params
      });
      this.operations.create(operation);
      this.closeEditor();
      return false;
    }
  });
})(jQuery);