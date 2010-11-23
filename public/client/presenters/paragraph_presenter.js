(function($) {
  $$.ParagraphPresenter = Backbone.View.extend({
    events : {
      "click .action-edit" : "openEditor",
      "click .cancel" : "closeEditor",
      "click .submit" : "saveEditor",

    },
    initialize : function() {
      _.bindAll(this, 'render');
      this.el = $$.render.paragraph(this.model);
      this.delegateEvents();
    },
    render : function() {
      return true;
    },
    openEditor : function() {
      this.$(".display").hide();
      this.$(".body").text(this.model.body);
      this.$(".editor").show();
    },
    closeEditor : function() {
      this.$(".editor").hide();
      this.$(".display").show();
    },
    saveEditor : function() {
      var body = this.$(".body").val();
      this.$(".section").html(body);
      var params = {};
      params.model_id = this.model.id;

      new $$.Operation({
        repository_id : this.model.repository_id,
        operation : {
          model : this.model.model,
          action : 'update',
          body : body,
          params : params
        }
      }).create();
      this.closeEditor();
    }
  });
})(jQuery);