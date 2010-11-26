(function() {
  $$.Operation = Backbone.Model.extend({
    http_params: 'operation'
  });

  $$.Operations = Backbone.Collection.extend({
    model: $$.Message,

    initialize : function(models, options) {
      this.url = options.url;
      assert(this.url, "url url can't be null in Operations");
    }
  });

})();