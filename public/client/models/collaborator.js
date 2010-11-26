(function() {
  $$.Collaborator = Backbone.Model.extend({
    });

  $$.Collaborators = Backbone.Collection.extend({
    model: $$.Collaborator,
    initialize : function(models, options) {
      var self = this;
      $$.workspace.bind('change:nada', function(workspace) {
        _.each(workspace.get('nada'), function(message) {
          self.add(new $$.Collaborator(message));
        });
      });
    }
  });
})();