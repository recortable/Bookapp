(function() {
  $$.Book = Backbone.Model.extend({
    name : 'Book',
    http_params: 'book',
    initialize : function() {
      assert(this.id, "Books must have an id");
      var project_id = this.get('project_id');
      assert(project_id, "Articles must have a project_id");
      this.url = "/projects/" + project_id + "/books/" + this.id + ".json";
    }
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