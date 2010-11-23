(function($) {
  $$.DocumentPresenter = Backbone.View.extend({
    el : $$.make('div', 'document-presenter'),

    initialize : function() {
      _.bindAll(this, 'render', 'show');
      this.model.bind("change", this.render);
    },
    show : function() {
      $("#content").html(this.el);
    },

    render : function() {
      $$.loading(false, this.url);
      var output = $$.render.document(this.model.toJSON());
      var list = $(".paragraphs", output);
      _.each(this.model.get('operations'), function(operation) {
        operation.params = $.parseJSON(operation.params);
        execute(operation, list);
      });
      
      list.append(new $$.SlotPresenter({repository_id : this.model.get('id')}).el);
      $(this.el).empty().append(output);
      return true;
    }

  });

  var execute = function(operation, list) {
    if (operation.action == 'create') {
      create(operation, list);
    } else if (operation.action == 'update') {
      $("#paragraph-" + operation.params.model_id, list).html(operation.body);
    }
  }

  var create = function(operation, list) {
    var slot = new $$.SlotPresenter({
      repository_id : operation.repository_id,
      before_id : operation.id
    });
    var para = new $$.ParagraphPresenter({
      model : operation
    });
    if (operation.params && operation.params.before) {
      var target = $("#paragraph-presenter-" + operation.params.before, list);
      target.before(para.el).before(slot.el);
    } else {
      list.append(slot.el).append(para.el);
    }

  }
})(jQuery);