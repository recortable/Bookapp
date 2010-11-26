(function() {
  $$.ArticlesController = Backbone.Controller.extend({
    routes: {
      "investigaciones/:project_id/articulos":  "articles",
      "investigaciones/:project_id/articulos/:article_id": "article"
    },

    articles : function(project_id) {
      log("controller#articles", project_id);
      loadArticles(project_id, true);
    },
    article : function(project_id, article_id) {
      if ($$.Util.isNumber(project_id)) {
        log("controller#article");
        loadArticle(project_id, article_id, true);
      }
    }
  });

  function loadArticles(project_id, show_articles) {
    $$.workspace.setProjectId(project_id);

    var cached = $$.Cache('articles', project_id, function() {
      var articles = new $$.Articles(null, {
        project_id : project_id
      });
      var presenter = new $$.ArticlesPresenter({
        model : articles
      });
      articles.fetch();
      return [articles, presenter];
    });
    $$.articles = cached[0];
    $$.articlesPresenter = cached[1];
    if (show_articles)
      $$.layout.showInBrowser($$.articlesPresenter.el);
  }

  function loadArticle(project_id, article_id) {
    $$.workspace.setProjectId(project_id);

    var cached = $$.Cache('article' + article_id, project_id, function() {
      var document = new $$.Document({
        url : "/projects/" + project_id + "/articles/" + article_id + ".json"
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
    loadArticles(project_id, true);
  }
})();