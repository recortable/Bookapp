(function() {
  function loadArticles(project_id, clear, callback) {
    $$.workspace.setProjectId(project_id);
    var url = "/projects/" + project_id + "/articles.json";
    var options = {
      project_id : project_id
    };
    $$.Cache.collection(url, $$.Articles, options, function(articles) {
      $$.articles = articles;
      $$.Cache.presenter(url + "Presenter", $$.ArticlesPresenter, $$.articles, function(presenter) {
        $$.articlesPresenter = presenter;
        $$.layout.showInBrowser(presenter);
        callback && callback();
      });
    });
    clear && $$.layout.clear();
  }

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
    },
    show : function(project_id, article_id) {
      if ($$.Util.isNumber(article_id)) {
        log("articles#show");
        loadArticles(project_id, false, function() {
          var url = "/projects/" + project_id + "/articles/" + article_id + ".json";
          $$.Cache.refresh(url, $$.articles, article_id, function (article) {
            var token = url + "-DocumentPresenter";
            $$.Cache.presenter(token, $$.DocumentPresenter, article, function (presenter) {
              $$.layout.show(presenter);
            });
          });
        });
      }
    },
    'new' : function(project_id) {
      loadArticles(project_id, false, function() {
        log("articles#new");
        $$.editor = new $$.ArticleEditor({
          model :new $$.Article({
            project_id : project_id
          })
        });
        $$.layout.show($$.editor);
      });
    },
    edit : function(project_id, article_id) {
      loadArticles(project_id, false, function() {
        log("articles#edit");
        var url = "/projects/" + project_id + "/articles/" + article_id + ".json";
        $$.Cache.refresh(url, $$.articles, article_id, function (article) {
          $$.editor = new $$.ArticleEditor({
            model : article
          });
          $$.layout.show($$.editor);
        });
      });
    }
  });


})();