(function($) {

  $$.WorkspacePresenter = Backbone.View.extend({
    el : $("#workspace"),

    events: {
      "click #navigate-to-projects":          "openProjects",
      "click #navigate-to-documents":         "openArchive",
      "click #navigate-to-discussions":       "openEditDialog",
      "click #navigate-to-index":             "openEditDialog"
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
      $$.loading(false, $$.workspace.url);
    },

    openProjects : function() {
      var project_id = this.model.get('project_id');
      if (project_id)
        $$.router.go('projects', project_id);
      else
        $$.router.go('projects')
    },

    openArchive : function() {
      var project_id = this.model.get('project_id');
      if (project_id)
        $$.router.go('projects', project_id, 'articles');
    }
  });


})(window.jQuery);