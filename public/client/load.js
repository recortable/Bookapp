(function($) {

  $(function() {
    $$.render = new $$.Render();
    $$.render.grabTemplates();
    load_workspace();

  });


  var load_workspace = function() {

    $("#workspace").show();

    $$.realtime.connect();
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
    
    $$.workspace.fetch({
      success : function() {
        new $$.ApplicationController();
        new $$.ArticlesController();
        new $$.DiscussionsController();
        new $$.ProjectsController();
        new $$.SessionController();
        new $$.BooksController();
        Backbone.history.start();
        console.log("client ready.");
      }
    });

    $$.workspacePresenter = new $$.WorkspacePresenter({
      model : $$.workspace
    });
  }
})(jQuery);