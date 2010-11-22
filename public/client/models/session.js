(function() {
  $$.Session = Backbone.Model.extend({
  
  });

  $$.Sessions = Backbone.Collection.extend({
     model: $$.Workspace,
     url: '/'
  });
})();