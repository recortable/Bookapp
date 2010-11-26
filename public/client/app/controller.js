(function() {
  $$.Controller = Backbone.Controller.extend({
    routes: {
      "": "root"
    },
    root: function() {
      $$.router.go('');
    }
  });
})();