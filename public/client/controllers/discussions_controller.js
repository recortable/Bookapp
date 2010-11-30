(function() {
  function loadDiscussions(project_id, clear, callback) {
    $$.workspace.setProjectId(project_id);
    var url = "/projects/" + project_id + "/discussions.json";
    var options = {
      project_id : project_id
    };
    $$.cache.collection(url, $$.Discussions, options, function(discussions) {
      $$.discussions = discussions;
      $$.cache.presenter(url + "Presenter", $$.DiscussionsPresenter, $$.discussions, function(presenter) {
        $$.discussionsPresenter = presenter;
        $$.layout.showInBrowser(presenter);
        callback && callback();
      });
    });
    clear && $$.layout.clear();
  }

  $$.DiscussionsController = Backbone.Controller.extend({
    routes: {
      'investigaciones/:project_id/debates': 'index',
      'investigaciones/:project_id/debates/crear' : 'new',
      'investigaciones/:project_id/debates/:discussion_id': 'show',
      'investigaciones/:project_id/debates/:discussion_id/editar': 'edit'
    },
    index : function(project_id) {
      log("controller#discussions", project_id);
      loadDiscussions(project_id, true);
    },
    show : function(project_id, discussion_id) {
      if ($$.Util.isNumber(discussion_id)) {
        log("discussions#show");
        loadDiscussions(project_id, false, function() {
          var url = "/projects/" + project_id + "/discussions/" + discussion_id + ".json";
          $$.cache.refresh(url, $$.discussions, discussion_id, function (discussion) {
            var token = url + "-DiscussionPresenter";
            $$.cache.presenter(token, $$.DiscussionDocumentPresenter, discussion, function (presenter) {
              $$.layout.show(presenter);
            });
          });
        });
      }
    },
    'new' : function(project_id) {
      loadDiscussions(project_id, false, function() {
        log("discussions#new");
        $$.editor = new $$.DiscussionEditor({
          model :new $$.Discussion({
            project_id : project_id
          })
        });
        $$.layout.show($$.editor);
      });
    },
    edit : function(project_id, discussion_id) {
      loadDiscussions(project_id, false, function() {
        log("discussions#edit");
        var url = "/projects/" + project_id + "/discussions/" + discussion_id + ".json";
        $$.cache.refresh(url, $$.discussions, discussion_id, function (discussion) {
          $$.editor = new $$.DiscussionEditor({
            model : discussion
          });
          $$.layout.show($$.editor);
        });
      });
    }
  });
})();