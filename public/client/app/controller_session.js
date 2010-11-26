(function() {
  $$.SessionController = Backbone.Controller.extend({
    routes: {
      "sesion": "show",
      "entrar" : "logIn",
      "alta" : "signUp"
    },
    logIn : function() {
      log("session#login");
      if ($$.workspace.get('user_id')) {
        $$.router.go("sesion");
      } else {
        new $$.LogInPresenter();
      }
    },
    signUp : function() {
      log("session#sign_up");
      if ($$.workspace.get('user_id')) {
        $$.router.go("sesion");
      } else {
        new $$.SignUpPresenter();
      }
    },
    show: function() {
      log("session#show");
      if ($$.workspace.get('user_id')) {
        new $$.SessionPresenter();
      } else {
        $$.router.go("");
      }
    }
  });
})();