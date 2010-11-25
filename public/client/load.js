(function($) {

  $(function() {
    $$.render = new $$.Render();
    $$.render.grabTemplates();
    load_workspace();
    $$.controller = new $$.Controller();
    new $$.ProjectsController();
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
    $$.projects = new $$.Projects();
    $$.projectsPresenter = new $$.ProjectsPresenter({
      model : $$.projects
    });
    
    $$.loading(true, $$.workspace.url);
    $$.workspace.fetch();

    $$.workspacePresenter = new $$.WorkspacePresenter({
      model : $$.workspace
    });
  }
})(window.jQuery);