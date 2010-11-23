(function($) {

  $$.WorkspacePresenter = Backbone.View.extend({
    el : $("#workspace"),

    events: {
      "click #navigate-to-projects":          "openProjects",
      "click #navigate-to-documents":   "openEditDialog",
      "click #navigate-to-discussions":   "openEditDialog",
      "click #navigate-to-index":   "openEditDialog"
    },


    initialize: function() {
      _.bindAll(this, "showLoading", "changed");
      this.model.bind("change", this.changed);

    },


    changed : function() {
      $("#current_user").html(this.model.get('user_name'));
      var current_project = this.model.get('project');
      if (current_project) {
        $("#current_project").html(current_project.get('title'));
      }
      $$.loading($$.workspace.url);
    },

    openProjects : function() {
      window.location.hash = "booka";
    }
  });


})(window.jQuery);