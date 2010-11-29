(function($) {
  var Operator = {
    Comment : {

  }
  }

  $$.BookDocumentPresenter = $$.RepositoryPresenter.extend({
    initialize : function() {
      this.init();
    },
    render : function() {
      var output = $$.render.book_document(this.model.toJSON());
      this.addAllOperations();
      $(this.el).empty().append(output);

      this.delegateEvents();
      return true;
    }
  });

  var BookOperator = {
    Indice : {
      create : function() {
        
      }
    }
  };


  $$.BookPresenter = $$.RepositoryPresenter.extend({
    operator : BookOperator,
    initialize: function() {
      this.init();
      this.el = $$.Render.div("indices list");
    },
    render: function() {
      return true;
    },
    clicked : function() {
      $$.router.go('projects', this.model.get('project_id'), 'books', this.model.get('id'));
    }
  });

  $$.BooksPresenter = Backbone.View.extend({
    el: $(".browser.books"),
    events : {
      'click .action-new' : 'newIndice'
    },
    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll');
      this.model.bind('add',     this.addOne);
      this.model.bind('refresh', this.addAll);
      this.list = this.$(".list");
      this.addAll(this.model);
    },
    addOne: function(book) {
      var view = new $$.BookPresenter({
        model: book
      });
      $(this.list).append(view.el);
    },
    addAll: function(models) {
      this.list.empty();
      models.each(this.addOne);
    },
    newIndice : function() {
      $$.router.go('projects', $$.workspace.get('project_id'), 'books', 'new');
    }
  });

})(jQuery);