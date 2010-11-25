(function() {

  var namesMap = {
    '' : 'investigaciones',
    projects : 'investigaciones',
    articles : 'articulos',
    discussions : 'debates',
    create : 'crear'
  }

  $$.router = {
    url_for : function() {
      return build_url(arguments);
    },
    go : function() {
      window.location.hash = build_url(arguments);
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