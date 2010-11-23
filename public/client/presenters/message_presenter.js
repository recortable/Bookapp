(function($) {

  var helpers = {
    fecha : function(context, fn) {
      return fn(this).substring(5);
    }
  }

  $$.MessagePresenter = Backbone.View.extend({
    initialize : function() {
      this.el = $$.render.message(this.model.toJSON(), helpers);
    },
    create : function() {
      var params = {message : this.model.toJSON()}
      Backbone.sync('create', params);
    }
  });

  $$.MessagesPresenter = Backbone.View.extend({
    el: $("#communicator"),
    
    events : {
      "keypress .body": 'sendOnEnter'
    },
    initialize : function() {
      _.bindAll(this, 'addOne', 'addAll', 'remove');
      this.model.bind('add',     this.addOne);
      this.model.bind('refresh', this.addAll);
      this.model.bind('remove', this.remove);
      this.input = this.$(".body");
      this.status = this.$(".status");
    },
    addOne: function(message) {
      var list = this.$('.list');
      var view = new $$.MessagePresenter({
        model: message
      });
      list.append(view.el);
    },
    addAll: function(model) {
      model.each(this.addOne);
    },
    remove : function(model) {
      this.$("#message-" + model.get('html_id')).remove();
    },
    sendOnEnter : function(e) {
      if (e.keyCode == 13) {
        this.model.create(new $$.Message({
          user_name : $$.workspace.get('user_name'),
          body: this.input.val()
        }));
        this.input.val('');
        return false;
      }
      return true;
    }
  });
})(window.jQuery);