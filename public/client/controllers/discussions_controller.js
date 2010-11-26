(function() {
  $$.DiscussionsController = Backbone.Controller.extend({
    routes: {
      "investigaciones/:project_id/debates" : "index",
      "investigaciones/:project_id/debates/:discussion_id" : "show"
    },
    index: function(project_id) {
      log("controller#index", project_id);
      loadDiscussions(project_id, true);
    },
    show : function(project_id, discussion_id) {
      log("discussions#show");
      $$.workspace.setProjectId(project_id);

      var cached = $$.Cache('discussion' + discussion_id, project_id, function() {
        var discussion = new $$.Document({
          url : "/projects/" + project_id + "/discussions/" + discussion_id + ".json"
        });
        var presenter = new $$.DiscussionDocumentPresenter({
          model : discussion
        });
        discussion.fetch();
        return [discussion, presenter];
      });
      $$.document = cached[0];
      $$.documentPresenter = cached[1];
      $$.documentPresenter.show();
      loadDiscussions(project_id, true);
    }
  });
  
  function loadDiscussions(project_id, show) {
    $$.workspace.setProjectId(project_id);

    var cached = $$.Cache('discussions', project_id, function() {
      var discussions = new $$.Discussions(null, {
        project_id : project_id
      });
      var presenter = new $$.DiscussionsPresenter({
        model : discussions
      });
      discussions.fetch();
      return [discussions, presenter];
    });
    $$.discussions = cached[0];
    $$.discussionsPresenter = cached[1];
    if (show)
      $$.layout.showInBrowser($$.discussionsPresenter.el);
  }

})();