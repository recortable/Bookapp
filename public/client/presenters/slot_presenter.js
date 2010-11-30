(function($) {

  // SlotPresenter
  $$.SlotPresenter = Backbone.View.extend({
    events : {
      "click": "openEditor",
      "click .cancel" : "closeEditor",
      "submit form" : "saveEditor"
    },
    initialize : function(options) {
      assert(this.options.operations, "Operations can't be null in SlotPresenter");
      assert(this.options.model, "Model name can't be null in SlotPresenter");
      
      _.bindAll(this, 'render');
      this.options = options;
      var i18n = $$.i18n.model[this.options.model];
      this.el = $$.render.slot({title : 'Añadir ' + i18n.singular + ' ' + i18n.name});
      this.editor = this.$('.editor');
      this.operations = this.options.operations;
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
        console.log("SLOT PARAMS", this.options.params)
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
      var params = {
        filter : this.$(".select.filter").val()
      };
      params = _.extend(params, this.options.params);
      var operation = new $$.Operation({
        repository_id : this.options.repository_id,
        model : this.options.model,
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