(function() {
  $$.Workspace = Backbone.Model.extend({
     url: '/.json',

     defaults : {
       project_id : -1
     },

     setProjectId : function(id) {
       this.set({project_id : id});
       if ($$.projects) {
          this.set({project : $$.projects.get(id)});
       }
     }
  });

})();