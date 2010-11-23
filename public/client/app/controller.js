(function() {
  $$.Controller = Backbone.Controller.extend({
    routes: {
      "":                           "root",
      "booka":                      "projects",
      "investigaciones/:id":        "project_call",  // #search/kiwis
      "search/:query/p:page":       "search"   // #search/kiwis/p7
    },

    root: function() {
      window.location.hash = "booka";
    },
    projects : function() {
      console.log("controller#projects");
      $$.projects = new $$.Projects();
      $$.projectsPresenter = new $$.ProjectsPresenter({
        model : $$.projects
      });
      $$.loading($$.projects.url);
      $$.projects.fetch();
      $$.projectsPresenter.el.show();
    },

    project_call: function(id) {
      console.log("controller#project_call");
      $$.workspace.setProjectId(id);
      $$.document = new $$.Document();
      $$.document.url = "/projects/" + id + ".json"
      $$.documentPresenter = new $$.DocumentPresenter({
        model : $$.document
      });
      $$.loading($$.document.url);
      $$.document.fetch();
      $$.documentPresenter.show();
      if (!$$.projects) {
       this.projects();
      }
    }

  });
})();