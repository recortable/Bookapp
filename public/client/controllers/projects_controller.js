(function() {

  $$.ProjectsController = Backbone.Controller.extend({
    routes : {
      "investigaciones": "index",
      "investigaciones/crear": "newProject",
      "investigaciones/:project_id": "show",
      "investigaciones/:project_id/editar": "edit"
    },
    index : function(invisible) {
      log("projects#index");
      $$.layout.showInBrowser($$.projectsPresenter);
      if (!invisible)
        $$.layout.clear();
    },
    show : function(project_id) {
      if ($$.Util.isNumber(project_id)) {
        log("projects#show");
        $$.workspace.setProjectId(project_id);
        var url = $$.url.project_path(project_id, '.json');
        console.log("JURL", url);
        $$.cache.refresh(url, $$.projects, project_id, function(project) {
          var token = url + "-DocumentPresenter";
          $$.cache.presenter(token, $$.DocumentPresenter, project, function(presenter) {
            console.log("PRESENTER", presenter);
            $$.layout.show(presenter);
          });
        });
        $$.layout.showInBrowser($$.projectsPresenter);
      }
    },
    newProject : function() {
      log("controller#newProject");
      $$.can.create('Project', function() {
        $$.editor = new $$.ProjectEditor({
          model :new $$.Project()
        });
        $$.layout.show($$.editor);
        $$.layout.showInBrowser($$.projectsPresenter);
      });
      $$.layout.showInBrowser($$.projectsPresenter);
    },
    edit : function(project_id) {
      var url = "/projects/" + project_id + ".json";
      $$.workspace.setProjectId(project_id);
      $$.cache.refresh(url, $$.projects, project_id, function (project) {
        $$.can.edit(project, function() {
          $$.editor = new $$.ProjectEditor({
            model : project
          });
          $$.layout.show($$.editor);
        });
      });
      $$.layout.showInBrowser($$.projectsPresenter);
    }
  });
})();