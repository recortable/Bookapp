(function($) {
  var Operator = {
    Opinion : {
      create : function(operation, presenter) {
        var para = new $$.ParagraphPresenter({
          model : operation,
          operations : presenter.operations
        });
        presenter.opinions.append(para.el);
      },
      update : function(operation, presenter) {
        var previous = presenter.operations.get(operation.get('params').model_id);
        assert(previous, "Update paragraph should have an previous operation");
        var params = _.extend({}, previous.get('params'));
        _.extend(params, {filter : operation.get('params').filter});
        console.log("UPDATE OPINION PARAMS", params);
        previous.set({
          body : operation.get('body'),
          params : params
        });
      }
    },
    Decission : {
      create : function(operation, presenter) {
        var para = new $$.ParagraphPresenter({
          model : operation,
          operations : presenter.operations
        });
        presenter.decissions.append(para.el);
      }
    },
    Reaction : {
      create : function(operation, presenter) {
        var para = new $$.ParagraphPresenter({
          model : operation,
          operations : presenter.operations
        });
        presenter.reactions.append(para.el);
      }
    }
  }

  $$.DiscussionDocumentPresenter = $$.RepositoryPresenter.extend({
    operator : Operator,
    initialize : function() {
      this.init();
    },
    render : function() {
      var output = $$.render.discussion_document(this.model.toJSON());
      this.decissions = $(".decissions", output);
      this.reactions = $(".reactions", output);
      this.opinions = $(".opinions", output);
      this.executeAllOperations();
      this.decissions.after(new $$.SlotPresenter({
        repository_id : this.model.get('id'),
        operations : this.operations,
        model : 'Decission'
      }).el);
      this.reactions.after(new $$.SlotPresenter({
        repository_id : this.model.get('id'),
        operations : this.operations,
        model : 'Reaction'
      }).el);
      this.opinions.after(new $$.SlotPresenter({
        repository_id : this.model.get('id'),
        operations : this.operations,
        model : 'Opinion'
      }).el);
      $(this.el).empty().append(output);

      this.delegateEvents();
      return true;
    }
  });

  $$.DiscussionPresenter = $$.BrowserItemPresenter.extend({
    open : function() {
      $$.router.go_project('discussions', this.model.get('id'));
      return false;
    },
    edit : function() {
      $$.router.go_project('discussions', this.model.get('id'), 'edit');
      return false;
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