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

  $$.Cache2.refresh = function(url, collection, id, callback) {
    $$.Cache2(url, function(url) {
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

  $$.Cache2.model = function(url, modelClass, callback) {
    $$.Cache2(url, function(url) {
      var model = new modelClass();
      model.url = url;
      model.fetch({
        success : callback
      });
      return model;
    }, function(article) {
      callback(article);
    });
  };

  $$.Cache2.collection = function(url, collectionClass, options, callback) {
    $$.Cache2(url, function() {
      var articles = new collectionClass(null, options);
      articles.fetch({
        success : callback
      });
      return articles;
    }, function(articles) {
      callback(articles);
    });
  }

  $$.Cache2.presenter = function(token, presenterClass, model, callback) {
    $$.Cache2(token, function() {
      var presenter = new presenterClass({model : model});
      callback(presenter);
      return presenter;
    }, function(presenter) {
      callback(presenter);
    });
  }
})();