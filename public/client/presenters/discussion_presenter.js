(function($) {
  var Operator = {
    Comment : {

  }
  }

  $$.DiscussionDocumentPresenter = $$.RepositoryPresenter.extend({
    initialize : function() {
      this.init();
    },
    render : function() {
      var output = $$.render.discussion_document(this.model.toJSON());
      this.addAllOperations();
      $(this.el).empty().append(output);

      this.delegateEvents();
      return true;
    }
  });

  $$.DiscussionPresenter = Backbone.View.extend({
    events : {
      'click' : 'clicked'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.model.view = this;
      this.render();
      this.delegateEvents();
    },
    render: function() {
      this.el = $$.render.discussion(this.model.toJSON());
      return true;
    },
    clicked : function() {
      $$.router.go('projects', this.model.get('project_id'), 'discussions', this.model.get('id'));
    }
  });

  $$.DiscussionsPresenter = Backbone.View.extend({
    el: $(".browser.discussions"),

    events : {
      "click .action-new" : "newDiscussion"
    },

    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll');
      this.model.bind('add',     this.addOne);
      this.model.bind('refresh', this.addAll);
      this.list = this.$(".list");
      this.addAll(this.model);
    },
    addOne: function(discussion) {
      var view = new $$.DiscussionPresenter({
        model: discussion
      });
      $(this.list).append(view.el);
    },
    addAll: function(models) {
      if (models.length == 0) {
        this.list.html($$.render.discussions_empty($$.workspace.get('project').toJSON()));
      } else {
        this.list.empty();
        models.each(this.addOne);
      }
    },
    newDiscussion : function() {
      $$.router.go_project("discussions", "new");
      return false;
    }
  });

  // DiscussionEditor
  // -------------
  $$.DiscussionEditor = Backbone.View.extend({
    events : {
      "click .cancel" : "cancel",
      'submit form' : 'submit'
    },
    initialize : function() {
      var isNew = this.model.isNew();
      var data = this.model.toJSON();
      var  project = $$.projects.get(this.model.get('project_id'));
      data.editor_title = isNew ? 'Añadir un tema de debate a ' + project.get('title') : 'Editar tema de debate ' + this.model.get('title');
      data.editor_submit = isNew ? 'Crear tema de debate' : 'Guardar tema de debate';
      this.el = $$.render.discussionEditor(data);
      this.delegateEvents();
    },
    cancel : function() {
      $$.router.go_project('discussions');
      return false;
    },
    submit : function() {
      var model = {
        title : this.$("#repository_title").val(),
        description : this.$("#repository_description").val()
      }
      var options = {
        success : function(data) {
          $$.router.go_project('discussions', data.id);
        }
      };

      if (this.model.isNew()) {
        $$.discussions.create(new $$.Discussion(model), options);
      } else {
        this.model.save(model, options);
      }
      return false;
    }
  });
 
})(jQuery);