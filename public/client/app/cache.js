(function() {
  var cache = {};
  $$.cache = function(token, fail, success) {
    var object = cache[token];
    if (object == null) {
      object = fail(token);
      cache[token] = object;
    } else {
      success(object);
    }
  }

  $$.cache.get = function(token) {
    return cache[token];
  }

  $$.cache.refresh = function(url, collection, id, callback) {
    $$.cache(url, function(url) {
      var model = collection.get(id);
      assert(model, "Cache refrehs: can't find the model", id, url, collection);
      model.url = url;
      model.fetch({
        success : callback
      });
      return model;
    }, function(article) {
      callback(article);
    });
  }

  $$.cache.collection = function(url, collectionClass, options, callback) {
    $$.cache(url, function() {
      var articles = new collectionClass(null, options);
      articles.fetch({
        success : callback
      });
      return articles;
    }, function(articles) {
      callback(articles);
    });
  }

  $$.cache.presenter = function(token, presenterClass, model, callback) {
    $$.cache(token, function() {
      var presenter = new presenterClass({model : model});
      callback(presenter);
      return presenter;
    }, function(presenter) {
      callback(presenter);
    });
  }
})();