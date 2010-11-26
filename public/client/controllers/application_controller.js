(function() {
  $$.ApplicationController = Backbone.Controller.extend({
    routes: {
      "": "root"
    },
    root: function() {
      $$.router.go('projects', 1);
    }
  });
})();