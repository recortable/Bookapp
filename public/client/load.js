(function($) {

  $(function() {
    $$.workspacePresenter = new $$.WorkspacePresenter({
      model : null
    });
    $$.loading = $$.workspacePresenter.showLoading;
    $$.loading(false);
    console.log("client ready.");
  });
})(window.jQuery);