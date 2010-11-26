(function() {
  $$.Workspace = Backbone.Model.extend({
    url: '/.json',
    defaults : {
      project_id : null
    },
    initialize : function() {
    },
    setProjectId : function(id) {
      if (id == null) {
        this.set({
          project_id : null,
          project : null
        });
      } else {
        id = parseInt(id);
        this.set({
          project_id : id
        });
        if (id && $$.projects) {
          this.set({
            project : $$.projects.get(id)
          });
        }
      }
    }
  });

})();