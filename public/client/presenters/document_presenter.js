(function($) {
  $$.DocumentPresenter = Backbone.View.extend({
    events : {
      "click .new-comment" : "toggleNewComment",
      "click .comment.editor .cancel" : "toggleNewComment",
      "submit .comment.editor form" : "createComment"
    },
    initialize : function() {
      _.bindAll(this, 'render', 'show');
      this.model.bind("change", this.render);
      this.operations_url = this.model.url.substring(0, this.model.url.length - 5) + "/operations.json";
    },
    show : function() {
      $("#content").html(this.el);
    },
    render : function() {
      $$.loading(false, this.model.url);
      var output = $$.render.document(this.model.toJSON());
      this.paragraphs = $(".paragraphs", output);
      this.comments = $(".comments-list", output);
      var self = this;
      _.each(this.model.operations.models, function(operation) {
        execute(operation, self);
      });
      
      this.paragraphs.append(new $$.SlotPresenter({
        repository_id : this.model.get('id')
      }).el);
      $(this.el).empty().append(output);

      this.delegateEvents();
      return true;
    },
    toggleNewComment : function() {
      this.$(".comment.editor").slideToggle();
      this.$(".comments .comment.actions").slideToggle();
      return false;
    },
    createComment : function() {
      var content = this.$(".comment.editor textarea").val();
      this.toggleNewComment();
      return false;
    }

  });

  var Operator = {
    Paragraph : {
      create : function(operation, presenter) {
        var slot = new $$.SlotPresenter({
          repository_id : operation.get('repository_id'),
          operations_url : operation.url,
          before_id : operation.get('id')
        });
        var para = new $$.ParagraphPresenter({
          model : operation
        });
        var params = operation.get('params');
        if (params && params.before) {
          var target = $("#paragraph-presenter-" + params.before, presenter.paragraphs);
          target.before(para.el).before(slot.el);
        } else {
          presenter.paragraphs.append(slot.el).append(para.el);
        }
      },
      update : function(operation, presenter) {
        var element = "#paragraph-" + operation.get('params').model_id;
        $(element, presenter.paragraphs).html(operation.get('body'));
      }
    },
    Comment : {
      create : function(operation, presenter) {
        console.log("CREATE COMMENT", operation);
        presenter.comments.append($$.render.comment(operation.toJSON()));
      }
    }
  }

  var execute = function(operation, presenter) {
    var model = operation.get('model');
    var action = operation.get('action');
    var operator = Operator[model];
    var operation_function = operator ? operator[action] : null;
    operation_function && operation_function(operation, presenter);
  }

})(window.jQuery);