(function() {
  $$.Discussion = Backbone.Model.extend({
   
  });

  $$.Discussions = Backbone.Collection.extend({
    model: $$.Discussion,

    initialize : function(models, options) {
      this.project_id = options.project_id;
      this.url = "/projects/" + this.project_id + "/discussions.json";
    }
  });
})();