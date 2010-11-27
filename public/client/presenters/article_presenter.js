(function($) {
  $$.ArticlePresenter = Backbone.View.extend({
    events : {
      'click' : 'openArticle',
      'click .action-edit' : 'editArticle'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.model.view = this;
      this.render();
      $(this.el).click(this.clicked);
    },
    render: function() {
      var older = this.el;
      this.el = $$.render.article(this.model.toJSON());
      older.replaceWith && older.replaceWith(this.el);
      this.delegateEvents();
      return true;
    },
    openArticle : function() {
      $$.router.go_project('articles', this.model.get('id'));
      return false;
    },
    editArticle : function() {
      $$.router.go_project('articles', this.model.get('id'), 'edit');
      return false;
    }
  });

  $$.ArticlesPresenter = Backbone.View.extend({
    el: $(".browser.articles"),
    events : {
      'click .action-new' : 'newArticle'
    },

    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render');
      this.model.bind('add',     this.addOne);
      this.model.bind('refresh', this.addAll);
      this.list = this.$(".list");
    },
    addOne: function(article) {
      var view = new $$.ArticlePresenter({
        model: article
      });
      $(this.list).append(view.el);
    },
    addAll: function(models) {
      if (models.length == 0) {
        this.list.html($$.render.articles_empty($$.workspace.get('project').toJSON()));
      } else {
        this.list.empty();
        models.each(this.addOne);
      }
    },
    newArticle : function() {
      $$.router.go('projects', $$.workspace.get('project_id'), 'articles', 'new');
    }
  });

  // ArticleEditor
  // -------------
  $$.ArticleEditor = Backbone.View.extend({
    events : {
      "click .cancel" : "cancel",
      'submit form' : 'submit'
    },
    initialize : function() {
      var isNew = this.model.isNew();
      var data = this.model.toJSON();
      var  project = $$.projects.get(this.model.get('project_id'));
      data.editor_title = isNew ? 'Añadir un artículo a ' + project.get('title') : 'Editar artículo ' + this.model.get('title');
      data.editor_submit = isNew ? 'Crear artículo' : 'Guardar artículo';
      this.el = $$.render.articleEditor(data);
      this.delegateEvents();
    },
    cancel : function() {
      $$.router.go_project('articles');
      return false;
    },
    submit : function() {
      var model = {
        title : this.$("#repository_title").val(),
        description : this.$("#repository_description").val()
      }
      var options = {
        success : function(data) {
          $$.router.go_project('articles', data.id);
        }
      };

      if (this.model.get('id')) {
        this.model.save(model, options);
      } else {
        $$.articles.create(new $$.Article(model), options);
      }
      return false;
    }
  });

})(window.jQuery);