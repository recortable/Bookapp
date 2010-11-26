(function($) {
  $$.RepositoryPresenter = Backbone.View.extend({
    init : function() {
      _.bindAll(this, 'render', 'show', 'addOperation', 'addAllOperations');
      this.model.bind("change", this.render);
      this.model.operations.bind("add", this.addOperation);
      this.model.operations.bind("refresh", this.addAllOperations);
      this.render();
    },
    show : function() {
      $("#content").html(this.el);
    },
    addOperation : function(operation) {
      var model = operation.get('model');
      var action = operation.get('action');
      var operator = this.operator[model];
      var operation_function = operator ? operator[action] : null;
      operation_function && operation_function(operation, this);
    },
    addAllOperations : function() {
      _.each(this.model.operations.models, this.addOperation);
    }
  });
})(window.jQuery);