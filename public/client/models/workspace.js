(function() {
  $$.Workspace = Backbone.Model.extend({
     url: '/.json',

     defaults : {
       project_id : null
     },

     setProjectId : function(id) {
       this.set({project_id : id});
       if (id && $$.projects) {
          this.set({project : $$.projects.get(id)});
       }
     }
  });

})();