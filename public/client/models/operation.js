(function() {
  $$.Operation = Backbone.Model.extend({
    initialize : function() {
      _.bindAll(this, 'create');
      this.url = "/projects/" + this.get('repository_id') + "/operations";
      var id = this.get('id');
      this.url += (id) ? "/" + id + ".json" : ".json";
    },
    create : function() {
      var data = this.get('operation');
      data.params = JSON.stringify(data.params);
      this.save();
    }
  });

})();