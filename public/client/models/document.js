(function() {

  $$.Document = Backbone.Model.extend({
    initialize : function() {
      _.bindAll(this, 'setOperations');
      this.url = this.model.get('url');
      assert(this.url, "document.url can't be null");
      this.bind('change', this.setOperations);
    },
    setOperations : function() {
      var models = [];
      _.each(this.get('operations'), function(data) {
        data.params = $.parseJSON(data.params);
        var operation = new $$.Operation(data);
        models.push(operation)
      })
      this.operations = new $$.Operations(models);
    }
  });

  $$.Documents = Backbone.Collection.extend({
     model: $$.Document
  });
})();