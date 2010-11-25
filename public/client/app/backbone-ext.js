(function() {


  // Backbone extensions
  _.extend(Backbone.Collection.prototype, {
    // Change create: always add and remove if failed
    create : function(model, options) {
      log("CREATE", model, options);
      var coll = this;
      options || (options = {});
      if (!(model instanceof Backbone.Model)) {
        model = new this.model(model, {
          collection: coll
        });
      } else {
        model.collection = coll;
      }
      coll.add(model);
      var error = function(nextModel, resp) {
        console.log("CREATE ERROR!", nextModel, resp);
        coll.remove(model);
        if (options.error) options.error(nextModel, resp);
      };

      var success = function(nextModel, resp) {
        model.set(nextModel.toJSON());
        if (options.success) options.success(nextModel, resp);
      }
      
      return model.save(null, {
        success : success,
        error : error
      });
    }
  });
})();