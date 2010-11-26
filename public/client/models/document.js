(function() {



  $$.Document = Backbone.Model.extend({
    initialize : function() {
      _.bindAll(this, 'setOperations');
      this.url = this.get('url');
      assert(this.url, "url can't be null in documents.");
      this.bind('change', this.setOperations);
      this.operations = new $$.Operations(null, {
        url : operations_url(this.url)
      });
    },
    setOperations : function() {
      var models = [];
      _.each(this.get('operations'), function(data) {
        data.params = $.parseJSON(data.params);
        var operation = new $$.Operation(data);
        models.push(operation)
      })
      this.operations.refresh(models);
    }
  });

  $$.Documents = Backbone.Collection.extend({
     model: $$.Document
  });
})();