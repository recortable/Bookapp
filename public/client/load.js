(function($) {

  $(function() {
    $$.render = new $$.Render();
    $$.render.grabTemplates();
    load_workspace();
    new $$.Controller();
    new $$.ProjectsController();
    new $$.ArticlesController();
    new $$.DiscussionsController();
    new $$.SessionController();
    Backbone.history.start();
    console.log("client ready.");
  });


  var load_workspace = function() {

    $("#workspace").show();

    $$.workspace = new $$.Workspace();

    $$.messages = new $$.Messages();
    $$.messagesPresenter = new $$.MessagesPresenter({
      model : $$.messages
    });
    $$.collaborators = new $$.Collaborators();
    $$.collaboratorsPresenter = new $$.CollaboratorsPresenter({
      model : $$.collaborators
    });
    $$.projects = new $$.Projects();
    $$.projectsPresenter = new $$.ProjectsPresenter({
      model : $$.projects
    });
    
    $$.workspace.fetch();

    $$.workspacePresenter = new $$.WorkspacePresenter({
      model : $$.workspace
    });
  }
})(window.jQuery);