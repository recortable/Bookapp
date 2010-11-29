(function($) {


  $$.ProjectPresenter = Backbone.View.extend({
    events : {
      'click' : 'openProject',
      'click .action-edit' : 'editProject'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.el = $$.Render.div('project item');
      this.model.bind('change', this.render);
      this.render();
    },
    render: function() {
      this.el.attr('id', "project-" + this.model.get('id'));
      this.el.html($$.render.project(this.model.toJSON()));
      this.delegateEvents();
      return true;
    },
    openProject : function() {
      $$.router.go('projects', this.model.get('id'));
      return false;
    },
    editProject : function() {
      $$.router.go('projects', this.model.get('id'), 'edit');
      return false;
    }
  });

  $$.ProjectsPresenter = Backbone.View.extend({
    el: $(".browser.projects"),

    events : {
      "click .action-new" : "newProject"
    },

    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll');
      this.model.bind('add',     this.addOne);
      this.model.bind('refresh', this.addAll);
      this.list = this.$(".list");
    },
    addOne: function(project) {
      var view = new $$.ProjectPresenter({
        model: project
      });
      $(this.list).append(view.el);
    },
    addAll: function(model) {
      $(this.list).empty();
      model.each(this.addOne);
    },
    newProject : function() {
      $$.router.go("projects", "new");
    }
  });

  // ProjectEditor
  // -------------
  $$.ProjectEditor = Backbone.View.extend({
    events : {
      "click .cancel" : "cancel",
      "submit form" : "submit"
    },
    initialize : function() {
      var isNew = this.model.isNew();
      var data = this.model.toJSON();
      data.editor_title = isNew ? 'Añadir una investigación' : 'Editar investigación ' + this.model.get('title');
      data.editor_submit = isNew ? 'Crear investigación' : 'Guardar investigación';
      this.el = $$.render.projectEditor(data);
      this.delegateEvents();
    },
    cancel : function() {
      $$.router.go('projects');
      return false;
    },
    submit : function() {
      var model = {
        title : this.$("#project_title").val(),
        description : this.$("#project_description").val(),
        stage : this.$("#project_stage").val(),
        'public' : this.$("#project_public").val()
      }
      var options = {
        success : function(data) {
          $$.router.go('projects', data.id);
        }
      };

      if (this.model.isNew()) {
        $$.projects.create(new $$.Project(model), options);
      } else {
        this.model.save(model, options);
      }
      return false;
    }
  });
})(jQuery);