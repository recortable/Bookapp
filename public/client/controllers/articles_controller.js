(function() {
  $$.ArticlesController = Backbone.Controller.extend({
    routes: {
      'investigaciones/:project_id/articulos': 'index',
      'investigaciones/:project_id/articulos/crear' : 'new',
      'investigaciones/:project_id/articulos/:article_id': 'show',
      'investigaciones/:project_id/articulos/:article_id/editar': 'edit'
    },
    index : function(project_id, invisible) {
      log("controller#articles", project_id);
      $$.workspace.setProjectId(project_id);
      var url = "/projects/" + project_id + "/articles.json";
      var options = {
        project_id : project_id
      };
      $$.Cache2.collection(url, $$.Articles, options, function(articles) {
        $$.Cache2.presenter(url + "Presenter", $$.ArticlesPresenter, articles, function(presenter) {
          $$.layout.showInBrowser(presenter);
        });
      });
      if (!invisible)
        $$.layout.clear();
    },
    show : function(project_id, article_id) {
      if ($$.Util.isNumber(article_id)) {
        log("controller#article");
        $$.workspace.setProjectId(project_id);
        var url = "/projects/" + project_id + "/articles/" + article_id + ".json";
        $$.Cache2.model(url, $$.Article, function (article) {
          var token = url + "-DocumentPresenter";
          $$.Cache2.presenter(token, $$.DocumentPresenter, article, function (presenter) {
            presenter.show();
          });
        });
        this.index(project_id, true);
      }
    },
    'new' : function(project_id) {
      log("articles#new");
      $$.editor = new $$.ArticleEditor({
        model :new $$.Article({
          project_id : project_id
        })
      });
      $$.layout.show($$.editor);
      this.index(project_id, true);
    },
    edit : function(project_id, article_id) {
      log("articles#edit");
      $$.workspace.setProjectId(project_id);
      var url = "/projects/" + project_id + "/articles/" + article_id + ".json";
      $$.Cache2.model(url, $$.Article, function (article) {
        $$.editor = new $$.ArticleEditor({
          model : article
        });
        $$.layout.show($$.editor);
      });
      this.index(project_id, true);
    }
  });


})();