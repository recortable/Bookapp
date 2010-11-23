(function($) {

  $(function() {
    $$.render = new $$.Render();
    $$.render.grabTemplates();
    load_workspace();
    $$.controller = new $$.Controller();
    Backbone.history.start();
    console.log("client ready.");
  });


  var load_workspace = function() {

    $("#workspace").show();

    $$.workspace = new $$.Workspace();
    $$.loading(true, $$.workspace.url);
    $$.workspace.fetch();

    $$.workspacePresenter = new $$.WorkspacePresenter({
      model : $$.workspace
    });
  }
})(window.jQuery);