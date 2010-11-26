(function() {

  $$.ProjectsController = Backbone.Controller.extend({
    routes : {
      "investigaciones": "projects",
      "investigaciones/crear": "newProject",
      "investigaciones/:project_id": "project_call"
    },
    projects : function() {
      log("controller#projects");
      loadProjects(true);
    },
    project_call: function(project_id) {
      if ($$.Util.isNumber(project_id)) {
        log("controller#project_call");
        loadProjectCall(project_id);
        $$.layout.showInBrowser($$.projectsPresenter.el);
      }
    },
    newProject : function() {
      log("controller#newProject");
      $$.editor = new $$.ProjectEditor({
        model :new $$.Project()
      });
      $$.layout.show($$.editor);
      loadProjects(true);
    }
  });

  function loadProjects(show_projects) {
    if (!$$.projects) {
      $$.projects = new $$.Projects();
      $$.projectsPresenter = new $$.ProjectsPresenter({
        model : $$.projects
      });
      $$.projects.fetch();
      $$.projects.bind('refresh', function() {
        $$.workspace.setProjectId($$.workspace.get('project_id'));
      });
    }
    if (show_projects)
      $$.layout.showInBrowser($$.projectsPresenter.el);
  }

  function loadProjectCall(project_id) {
    $$.workspace.setProjectId(project_id);

    var cached = $$.Cache('call-' + project_id, project_id, function() {
      var document = new $$.Document({
        url : "/projects/" + project_id + ".json"
      });
      var presenter = new $$.DocumentPresenter({
        model : document
      });
      document.fetch();
      return [document, presenter];
    });
    $$.document = cached[0];
    $$.documentPresenter = cached[1];
    $$.documentPresenter.show();
  }

})();