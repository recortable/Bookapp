(function() {

  var articles_cache = {};

  $$.Controller = Backbone.Controller.extend({
    routes: {
      "":                                       "root",
      "booka":                                  "projects",
      "investigaciones/:project_id":            "project_call",
      "investigaciones/:project_id/articulos":  "articles"
    },

    root: function() {
      $$.router.go('');
    },
    
    projects : function() {
      console.log("controller#projects");
      loadProjects(true);
    },

    project_call: function(project_id) {
      console.log("controller#project_call");
      $$.workspace.setProjectId(project_id);
      $$.document = new $$.Document();
      // TODO: quizá mover esto a documento
      $$.document.url = "/projects/" + project_id + ".json"
      $$.documentPresenter = new $$.DocumentPresenter({
        model : $$.document
      });
      $$.loading(true, $$.document.url);
      $$.document.fetch();
      $$.documentPresenter.show();
      loadProjects(true);
    },
    
    articles : function(project_id) {
      console.log("controller#articles", project_id);
      loadArticles(project_id, true);
      loadProjects(false);
    }
  });

  function loadArticles(project_id, show_articles) {
    $$.workspace.setProjectId(project_id);
    var cached = articles_cache[project_id];
    if (cached) {
      $$.articles = cached.articles;
      $$.articlesPresenter = cached.presenter;
    } else {
      $$.articles = new $$.Articles(null, {
        project_id : project_id
      });
      $$.articlesPresenter = new $$.ArticlesPresenter({
        model : $$.articles
      });
      articles_cache[project_id] = {
        articles : $$.articles,
        presenter : $$.articlesPresenter
      };
      $$.loading(true, $$.articles.url);
      $$.articles.fetch();
    }
    if (show_articles)
      showInBrowser($$.articlesPresenter.el);
  }

  function loadProjects(show_projects) {
    if (!$$.projects) {
      $$.projects = new $$.Projects();
      $$.projectsPresenter = new $$.ProjectsPresenter({
        model : $$.projects
      });
      $$.loading(true, $$.projects.url);
      $$.projects.fetch();
      $$.projects.bind('refresh', function() {
        $$.workspace.setProjectId($$.workspace.get('project_id'));
      });
    }
    if (show_projects)
      showInBrowser($$.projectsPresenter.el);
  }
  
  function showInBrowser(el) {
    console.log("SHOW IN BROWSER");
    $("#browser_viewport > *").hide();
    el.show();
  }

})();