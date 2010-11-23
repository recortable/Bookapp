(function() {
  $$.Article = Backbone.Model.extend({

  });

  $$.Articles = Backbone.Collection.extend({
     model: $$.Article,

     initialize : function(models, options) {
       this.project_id = options.project_id;
       this.url = "/projects/" + this.project_id + "/articles.json";
     }
  });
})();