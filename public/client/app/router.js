(function() {

  var namesMap = {
    '' : 'investigaciones',
    'projects' : 'investigaciones',
    'articles' : 'articulos',
    'discussions' : 'debates',
    'books' : 'indice',
    'new' : 'crear',
    'edit' : 'editar'
  }

  $$.url = function() {
    return build_url(arguments);
  }
  $$.url.login = "entrar";

  $$.router = {
    url_for : function() {
      return build_url(arguments);
    },
    go : function() {
      $$.flash();
      window.location.hash = build_url(arguments);
    },
    current : function() {
      return window.location.hash;
    },
    go_project : function() {
      var params = ['projects', $$.workspace.get('project_id')];
      _.each(arguments, function(arg) { params.push(arg)});
       window.location.hash = build_url(params);
    },
    login : function() {
      $$.router.go('entrar');
    }
  };

  function build_url(args) {
    var url = null;
    for (var index = 0; index < args.length; index++) {
      var arg = args[index];
      var mapped = namesMap[arg];
      var segment = mapped ? mapped : arg;
      if (url)
        url = url + "/" + segment;
      else
        url = segment;
    }
    return url;
  }

})();