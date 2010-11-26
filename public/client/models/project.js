(function() {
  $$.Project = Backbone.Model.extend({

    });

  $$.Projects = Backbone.Collection.extend({
    model: $$.Project,
    url: '/projects.json',

    initialize : function() {
      var self = this;
      $$.workspace.bind('change:projects', function(workspace) {
        _.each(workspace.get('projects'), function(project) {
          self.add(new $$.Project(project));
        });
        $$.workspace.setProjectId($$.workspace.get('project_id'));
      });
    }
  });
})();