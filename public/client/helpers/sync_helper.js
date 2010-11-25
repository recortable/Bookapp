(function() {
  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
  };

  var REMOVE = ['html_id', 'created_at', 'updated_at'];

  var getUrl = function(object) {
    if (!(object && object.url)) throw new Error("A 'url' property or function must be specified");
    return _.isFunction(object.url) ? object.url() : object.url;
  };
  
  Backbone.sync = function(method, model, success, error) {
    var type = methodMap[method];

    var data = (method === 'create' || method === 'update') ? model.toJSON() : null;
    if (data) {
      _.each(REMOVE, function(item) {delete data[item];});
    }

    if (data && model.http_params) {
      var source = data;
      data = {};
      data[model.http_params] = source;
    }
    var modelJSON = data ? JSON.stringify(data) : null;

    // Default JSON-request options.
    var params = {
      url:          getUrl(model),
      type:         type,
      contentType:  'application/json',
      data:         modelJSON,
      dataType:     'json',
      processData:  false,
      success:      success,
      error:        error
    };

    console.log("SYNC", params);

    // Make the request.
    $.ajax(params);
  };

})();