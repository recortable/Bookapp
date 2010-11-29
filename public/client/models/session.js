(function() {

  $$.user = function() {
    return $$.workspace.get('user_id') != null;
  }
  $$.user.name = function() {
    return $$.workspace.get('user_name');
  }

  $$.Session = Backbone.Model.extend({
  
    });

  $$.Sessions = Backbone.Collection.extend({
    model: $$.Session,
    url: '/'
  });
})();