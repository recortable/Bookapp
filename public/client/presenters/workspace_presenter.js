(function($) {

  $$.WorkspacePresenter = Backbone.View.extend({
    el : $("#workspace"),

    events: {
      "click #navigate-to-projects":          "openProjects",
      "click #navigate-to-documents":         "openArticles",
      "click #navigate-to-discussions":       "openDiscussions",
      "click #navigate-to-index":             "openIndex",
      "click #navigate-to-activities" : 'openMessages',
      "click #navigate-to-users":"openUsers"

    },
    initialize: function() {
      _.bindAll(this, "showLoading", "changed");
      this.model.bind("change", this.changed);
    },
    changed : function() {
      var user = this.model.get('user_name');
      if (user) {
        $("#current_user").html(this.model.get('user_name'));
        $("#session_controls").hide();
        $("#current_user").show();
        $("#navigate-to-users").show();
      } else {
        $("#session_controls").show();
        $("#current_user").hide();
        $("#navigate-to-users").hide();
      }
      var current_project = this.model.get('project');
      if (current_project) {
        $("#current_project").html(current_project.get('title'));
        $("#navigate-to-documents").show();
        $("#navigate-to-discussions").show();
        $("#navigate-to-index").show();
      }
    },

    openProjects : function() {
      var project_id = this.model.get('project_id');
      if (project_id)
        $$.router.go('projects', project_id);
      else
        $$.router.go('projects')
    },
    openArticles : function() {
      var project_id = this.model.get('project_id');
      if (project_id)
        $$.router.go('projects', project_id, 'articles');
    },
    openDiscussions : function() {
      var project_id = this.model.get('project_id');
      if (project_id)
        $$.router.go('projects', project_id, 'discussions');
    },
    openMessages : function() {
      $$.layout.showInComm($$.messagesPresenter.el);
    },
    openUsers : function() {
      $$.layout.showInComm($$.collaboratorsPresenter.el);
    }
  });


})(window.jQuery);