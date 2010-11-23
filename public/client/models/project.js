(function() {
  $$.Project = Backbone.Model.extend({

  });

  $$.Projects = Backbone.Collection.extend({
     model: $$.Project,
     url: '/projects.json'
  });
})();