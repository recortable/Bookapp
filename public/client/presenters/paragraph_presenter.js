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
    },
    render : function() {
      this.$(".body").html(this.model.get('body'));
      return true;
    },
    openEditor : function() {
      this.$(".display").hide();
      this.$(".body").text(this.model.get('body'));
      this.$(".editor").show();
    },
    closeEditor : function() {
      this.$(".editor").hide();
      this.$(".display").show();
    },
    saveEditor : function() {
      console.log("SAVE!");
      var body = this.$(".body").val();
      this.$(".body").html(body);
      var params = {};
      params.model_id = this.model.id;

      this.operations.create(new $$.Operation({
        repository_id : this.model.repository_id,
        model : this.model.model,
        action : 'update',
        body : body,
        params : params
      }));
      this.closeEditor();
      return false;
    }
  });
})(jQuery);