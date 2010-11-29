(function() {
  var cache = {};
  $$.Cache = function(token, fail, success) {
    var object = cache[token];
    if (object == null) {
      object = fail(token);
      cache[token] = object;
    } else {
      success(object);
    }
  }

  $$.Cache.refresh = function(url, collection, id, callback) {
    $$.Cache(url, function(url) {
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

  $$.Cache.collection = function(url, collectionClass, options, callback) {
    $$.Cache(url, function() {
      var articles = new collectionClass(null, options);
      articles.fetch({
        success : callback
      });
      return articles;
    }, function(articles) {
      callback(articles);
    });
  }

  $$.Cache.presenter = function(token, presenterClass, model, callback) {
    $$.Cache(token, function() {
      var presenter = new presenterClass({model : model});
      callback(presenter);
      return presenter;
    }, function(presenter) {
      callback(presenter);
    });
  }
})();