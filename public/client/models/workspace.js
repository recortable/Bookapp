(function() {
  $$.Workspace = Backbone.Model.extend({
  
  });

  $$.Workspaces = Backbone.Collection.extend({
     model: $$.Workspace,
     url: '/'
  });
})();