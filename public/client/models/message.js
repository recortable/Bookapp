(function() {
  $$.Message = Backbone.Model.extend({
    url: '/messages.json',
    http_params: 'message',

    initialize : function() {
      var html_id = this.get('id');
      html_id || (html_id = this.cid);
      this.set({html_id : html_id});
    }
  });

  $$.Messages = Backbone.Collection.extend({
    model: $$.Message,

    initialize : function(models, options) {
      var self = this;
      $$.workspace.bind('change:messages', function(workspace) {
        _.each(workspace.get('messages'), function(message) {
          self.add(new $$.Message(message));
        });
      });
    }
  });
})();