(function($) {


  $$.ProjectPresenter = Backbone.View.extend({
    tag : 'div',

    initialize: function() {
      _.bindAll(this, 'render', 'clicked');
      this.model.bind('change', this.render);
      this.model.view = this;
      this.render();
      $(this.el).click(this.clicked);
    },
    render: function() {
      this.el = $$.render.project(this.model.toJSON());
      return true;
    },
    clicked : function() {
      $$.router.go('projects', this.model.get('id'));
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

  $$.ProjectEditor = Backbone.View.extend({
    events : {
      "click .cancel" : "cancel"
    },
    initialize : function() {
      this.el = $$.render.projectEditor(this.model.toJSON());
      this.delegateEvents();
    },
    cancel : function() {
      $$.router.go('projects');
      return false;
    }
  });


})(window.jQuery);