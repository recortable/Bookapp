(function() {

  $$.BrowserItemPresenter = Backbone.View.extend({
    events : {
      'click' : 'open',
      'click .action-edit' : 'edit'
    },
    initialize: function() {
      _.bindAll(this, 'render', 'edit');
      this.el = $$.Render.div('discussion item');
      this.model.bind('change', this.render);
      this.model.view = this;
      this.render();
      this.delegateEvents();
    },
    render: function() {
      this.el.attr('id', this.model.name + "-" + this.model.get('id'));
      this.el.html($$.render.browser_item(this.model.toJSON()));
      this.delegateEvents();
      return true;
    }
  });

})(jQuery);