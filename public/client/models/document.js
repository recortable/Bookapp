(function() {

  $$.Document = Backbone.Model.extend({
    initialize : function() {
    }
  });

  $$.Documents = Backbone.Collection.extend({
     model: $$.Document
  });
})();