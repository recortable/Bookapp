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
      this.el = $$.Render.div('paragraph');
      this.delegateEvents();
      this.render();
    },
    render : function() {
      this.el.attr('id', 'paragraph-' + this.model.get('id'));
      var filter = this.model.get('params').filter;
      filter || (filter = 'none')
      var data = _.extend({
        filtered_body : $$.filter[filter](this.model.get('body')),
        metadata : {
          user : 'dani',
          created_at : this.model.get('created_at')
        }
      }, this.model.toJSON());
      this.el.html($$.render.paragraph(data, $$.helpers));
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
      var body = this.$("form .body").val();
      this.$("form .body").html(body);
      var operation = this.model;
      this.operations.create(new $$.Operation({
        repository_id : operation.get('repository_id'),
        model : operation.get('model'),
        action : 'update',
        body : body,
        params : {
          model_id : "" + operation.get('id'),
          filter : this.$("form .filter").val()
        }
      }));
      this.closeEditor();
      return false;
    }
  });
})(jQuery);