(function($) {
  var Operator = {
    Paragraph : {
      create : function(operation, presenter) {
        var slot = new $$.SlotPresenter({
          repository_id : operation.get('repository_id'),
          operations : presenter.operations,
          before_id : operation.get('id')
        });
        var para = new $$.ParagraphPresenter({
          model : operation,
          operations : presenter.operations
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
        var old_operation = presenter.operations.get(operation.get('params').model_id);
        assert(old_operation, "Update paragraph should have an older operation");
        old_operation.set({
          body : operation.get('body')
        });
      //var element = "#paragraph-" + operation.get('params').model_id;
      //$(element, presenter.paragraphs).html(operation.get('body'));
      }
    },
    Comment : {
      create : function(operation, presenter) {
        presenter.comments.append($$.render.comment(operation.toJSON()));
      }
    }
  }
  
  // DocumentPresenter
  // model: Document
  $$.DocumentPresenter = $$.RepositoryPresenter.extend({
    operator : Operator,

    events : {
      "click .new-comment" : "toggleNewComment",
      "click .comment.editor .cancel" : "toggleNewComment",
      "submit .comment.editor form" : "createComment"
    },
    initialize : function() {
      this.init();
    },
    render : function() {
      if (this.operations) {
        var output = $$.render.document(this.model.toJSON());
        this.paragraphs = $(".paragraphs", output);
        this.comments = $(".comments-list", output);
        this.executeAllOperations();
        this.paragraphs.after(new $$.SlotPresenter({
          repository_id : this.model.get('id'),
          operations : this.operations
        }).el);
        $(this.el).empty().append(output);
        this.delegateEvents();
      }
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




})(jQuery);