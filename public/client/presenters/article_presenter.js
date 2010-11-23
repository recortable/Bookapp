(function($) {


  $$.ArticlePresenter = Backbone.View.extend({
    tag : 'div',

    initialize: function() {
      _.bindAll(this, 'render', 'clicked');
      this.model.bind('change', this.render);
      this.model.view = this;
      this.render();
      $(this.el).click(this.clicked);
    },
    render: function() {
      this.el = $$.render.article(this.model.toJSON());
      return true;
    },
    clicked : function() {
      $$.router.go('projects', this.model.get('project_id'), 'articles', this.model.get('id'));
    }
  });

  $$.ArticlesPresenter = Backbone.View.extend({
    el: $(".browser.articles"),

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

    addAll: function(model) {
      $$.loading(false, this.model.url);
      model.each(this.addOne);
    }
  });

})(window.jQuery);