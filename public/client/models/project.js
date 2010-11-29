(function() {
  $$.Project = Backbone.Model.extend({
    name : 'Project',
    http_params: 'project'
  });

  $$.Projects = Backbone.Collection.extend({
    model: $$.Project,
    url: '/projects.json',

    initialize : function() {
      var self = this;
      $$.workspace.bind('change:projects', function(workspace) {
        var models = []
        _.each(workspace.get('projects'), function(data) {
          models.push(new $$.Project(data));
        });
        console.log("PROJECTS CHANGED", models);
        self.refresh(models);
        $$.workspace.setProjectId($$.workspace.get('project_id'));
      });
    }
  });
})();