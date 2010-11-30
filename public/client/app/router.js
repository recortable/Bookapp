(function() {



  $$.router = {
    go : function() {
      $$.flash();
      window.location.hash = $$.url.token(arguments);
    },
    current : function() {
      return window.location.hash;
    },
    go_project : function() {
      var params = ['projects', $$.workspace.get('project_id')];
      _.each(arguments, function(arg) { params.push(arg)});
       window.location.hash = $$.url.token(params);
    },
    login : function() {
      $$.router.go('entrar');
    }
  };



})();