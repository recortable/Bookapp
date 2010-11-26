(function() {

  var cache = {}

  $$.Cache = function(category, key, func) {
    key = key.toString();
    cache[category] || (cache[category] = {});
    var value = cache[category][key];
    if (!value) {
      value = cache[category][key] = func();
    } else {
      log("CACHED! ", category, key);
    }
    return value;
  }

})();