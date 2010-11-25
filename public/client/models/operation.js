(function() {
  $$.Operation = Backbone.Model.extend({
    http_params: 'message'
  });

  $$.Operations = Backbone.Collection.extend({
    model: $$.Message
  });

})();