(function() {

  var articles_cache = {};
  var article_cache = {};
  var discussions_cache = {};
  
  $$.Controller = Backbone.Controller.extend({
    routes: {
      "":                                       "root",
      "investigaciones/:project_id/articulos":  "articles",
      "investigaciones/:project_id/articulos/:article_id": "article",
      "investigaciones/:project_id/debates" : "discussions"
    },

    root: function() {
      $$.router.go('');
    },
    
    articles : function(project_id) {
      console.log("controller#articles", project_id);
      loadArticles(project_id, true);
    },
    article : function(project_id, article_id) {
      console.log("controller#article");
      loadArticle(project_id, article_id, true);
    },
    discussions : function(project_id) {
      console.log("controller#discussions", project_id);
      loadDiscussions(project_id, true);
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
      $$.layout.showInBrowser($$.articlesPresenter.el);
  }

  function loadArticle(project_id, article_id) {
    $$.workspace.setProjectId(project_id);
    var cached = article_cache[article_id];
    if (cached) {
      $$.document = cached.document;
      $$.documentPresenter = cached.presenter;
    } else {
      $$.document = new $$.Document();
      $$.document.url = "/projects/" + project_id + "/articles/" + article_id + ".json"
      $$.documentPresenter = new $$.DocumentPresenter({
        model : $$.document
      });
      $$.loading(true, $$.document.url);
      $$.document.fetch();
      $$.documentPresenter.show();
      article_cache[article_id] = {
        document : $$.document,
        presenter : $$.documentPresenter
      };
    }
    loadArticles(project_id, true);
  }

  function loadDiscussions(project_id, show) {
    $$.workspace.setProjectId(project_id);
    var cached = discussions_cache[project_id];
    if (cached) {
      $$.discussions = cached.discussions;
      $$.discussionsPresenter = cached.presenter;
    } else {
      $$.discussions = new $$.Discussions(null, {
        project_id : project_id
      });
      $$.discussionsPresenter = new $$.DiscussionsPresenter({
        model : $$.dicussions
      });
      discussions_cache[project_id] = {
        discussions : $$.discussions,
        presenter : $$.discussionsPresenter
      };
      $$.loading(true, $$.discussions.url);
      $$.dicussions.fetch();
    }
    if (show)
      $$.layout.showInBrowser($$.discussionsPresenter.el);
  }
  


})();