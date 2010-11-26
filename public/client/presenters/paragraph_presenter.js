(function($) {
  $$.ParagraphPresenter = Backbone.View.extend({
    events : {
      "click .action-edit" : "openEditor",
      "click .cancel" : "closeEditor",
      "submit form" : "saveEditor"
    },
    initialize : function(options) {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.operations = options.operations;
      assert(this.operations, "Operations can't be null in ParagraphPresenter");
      this.el = $$.render.paragraph(this.model.toJSON());
      this.delegateEvents();
      console.log("PARAGRPAH", this.model);
    },
    render : function() {
      this.$(".body").html(this.model.get('body'));
      return true;
    },
    openEditor : function() {
      this.$(".display").hide();
      this.$(".editor-body").text(this.model.get('body'));
      this.$(".editor").show();
    },
    closeEditor : function() {
      this.$(".editor").hide();
      this.$(".display").show();
    },
    saveEditor : function() {
      var body = this.$(".editor-body").val();
      this.$(".body").html(body);
      var operation = this.model;
      this.operations.create(new $$.Operation({
        repository_id : operation.get('repository_id'),
        model : operation.get('model'),
        action : 'update',
        body : body,
        params : {
          model_id : operation.get('id')
        }
      }));
      this.closeEditor();
      return false;
    }
  });
})(jQuery);