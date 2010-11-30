(function() {

  $$.url = function() {
    return build(arguments, null);
  }
  $$.url.token = function(array) {
    return build(array, namesMap);
  }
  $$.url.login = "entrar";
  $$.url.projects_path = function(format) {
    return withFormat(['projects'], format);
  }
  $$.url.project_path = function(id, format) {
    return withFormat(['projects', id], format);
  }

  function withFormat(array, format) {
    var url = build(array);
    return format ? url + format : url;
  }

  var namesMap = {
    '' : 'investigaciones',
    'projects' : 'investigaciones',
    'articles' : 'articulos',
    'discussions' : 'debates',
    'books' : 'indice',
    'new' : 'crear',
    'edit' : 'editar'
  }

  function build(args, map) {
    var url = null;
    for (var index = 0; index < args.length; index++) {
      var arg = args[index];
      var mapped = map ? map[arg] : null;
      var segment = mapped ? mapped : arg;
      if (url)
        url = url + "/" + segment;
      else
        url = segment;
    }
    return url;
  }

})();