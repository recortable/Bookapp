(function() {
  var cache = {};
  $$.Cache2 = function(token, fail, success) {
    var object = cache[token];
    if (object == null) {
      object = fail(token);
      cache[token] = object;
    } else {
      success(object);
    }
  }
})();