(function() {
  $$.Project = Backbone.Model.extend({
    http_params: 'project'
  });

  $$.Projects = Backbone.Collection.extend({
    model: $$.Project,
    url: '/projects.json',

    initialize : function() {
      var self = this;
      $$.workspace.bind('change:projects', function(workspace) {
        console.log("REFRESH PROJECTS", workspace.get('projects'));
        var models = []
        _.each(workspace.get('projects'), function(project) {
          models.push(new $$.Project(project));
        });
        self.refresh(models);
        $$.workspace.setProjectId($$.workspace.get('project_id'));
      });
    }
  });
})();