(function() {
  $$.ArticlesController = Backbone.Controller.extend({
    routes: {
      'investigaciones/:project_id/articulos': 'index',
      'investigaciones/:project_id/articulos/crear' : 'new',
      'investigaciones/:project_id/articulos/:article_id': 'show',
      'investigaciones/:project_id/articulos/:article_id/editar': 'edit'
    },
    index : function(project_id) {
      log("controller#articles", project_id);
      loadArticles(project_id, true);
      $$.layout.clear();
    },
    show : function(project_id, article_id) {
      if ($$.Util.isNumber(article_id)) {
        log("controller#article");
        fetchArticle(project_id, article_id, function(article) {
          createDocumentPresenter(article, function(presenter) {
            presenter.show();
          });
        });
        loadArticles(project_id, true);
      }
    },
    'new' : function(project_id) {
      log("articles#newArticle");
      $$.editor = new $$.ArticleEditor({
        model :new $$.Article({
          project_id : project_id
        })
      });
      $$.layout.show($$.editor);
      loadArticles(project_id, true);
    },
    edit : function(project_id, article_id) {
      log("articles#newArticle");
      fetchArticle(project_id, article_id, function(article) {
        console.log("FETCH ARTICLE", article);
        $$.editor = new $$.ArticleEditor({
          model : article
        });
        $$.layout.show($$.editor);
      });
      loadArticles(project_id, true);
    }
  });

  function createDocumentPresenter(article, callback) {
    var token = '/project/' + article.get('project_id') + '/article/' + article.get('id') + '/documentPresenter';
    $$.Cache2(token, function() {
      var presenter = new $$.DocumentPresenter({
        model : article
      });
      callback(presenter);
      return presenter;
    }, function(presenter) {
      callback(presenter);
    });
  }

  function fetchArticle(project_id, article_id, callback) {
    url = "/projects/" + project_id + "/articles/" + article_id + ".json";
    $$.Cache2(url, function(url) {
      var article = new $$.Article();
      article.url = url;
      article.fetch({
        success : callback
      });
      return article;
    }, function(article) {
      callback(article);
    });
  }

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

  }
})();