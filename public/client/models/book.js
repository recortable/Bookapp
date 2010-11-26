(function() {
  $$.Book = Backbone.Model.extend({

  });

  $$.Books = Backbone.Collection.extend({
     model: $$.Article,

     initialize : function(models, options) {
       this.project_id = options.project_id;
       assert(this.project_id, "Books must have a project_id");
       this.url = "/projects/" + this.project_id + "/books.json";
     }
  });
})();