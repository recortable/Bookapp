(function() {
  $$.Operation = Backbone.Model.extend({
    http_params: 'operation',
    initialize : function() {
      this.bind('change:params', function(model) {
        var params = model.get('params');
        if (_.isString(params)) {
          model.set({params : $.parseJSON(params)});
        }
      });
    }
  });

  $$.Operations = Backbone.Collection.extend({
    model: $$.Message,

    initialize : function(models, options) {
      this.url = options.url;
      assert(this.url, "url url can't be null in Operations");
    }
  });

})();