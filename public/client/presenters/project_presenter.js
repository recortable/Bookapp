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
      window.location.hash = "investigaciones/" + this.model.get('id');
    }
  });

  $$.ProjectsPresenter = Backbone.View.extend({
    el: $(".browser.projects"),

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
      $$.loading(false, this.model.url);
      model.each(this.addOne);
    }
  });


})(window.jQuery);