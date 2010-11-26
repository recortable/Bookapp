(function($) {

  $$.SessionPresenter = Backbone.View.extend({
    events : {
      "submit form" : "closeSession"
    },
    initialize : function() {
      this.el = $$.render.current_session({
        user_name : $$.workspace.get('user_name')
      });
      this.delegateEvents();
      $("#content").html(this.el);
    },
    closeSession : function() {
      $.get("/users/sign_out", function(data) {
        });
      return false;
    }
  });

  $$.LogInPresenter = Backbone.View.extend({
    events : {
      "submit form" : "login"
    },
    initialize : function() {
      this.el = $$.render.login();
      this.delegateEvents();
      $("#content").html(this.el);
    },
    login : function() {
      var user = {
        user_email : this.$('#user_email').val(),
        user_password : this.$('#user_password').val(),
        user_remember_me : this.$('#user_remember_me').val()
      };
      console.log("LOGIN", user);
      $.ajax({
        type : 'POST',
        url :'/users/sign_in.json',
        dataType : 'json',
        data : user,
        success : function(data) {
          $$.workspace.set(data);
        }
      });
      return false;
    }
  });

  $$.SignUpPresenter = Backbone.View.extend({
    events : {
      "submit form" : "signUp"
    },
    initialize : function() {
      this.el = $$.render.sign_up();
      this.delegateEvents();
      $("#content").html(this.el);
    },
    signUp : function() {
      return false;
    }
  });


})(window.jQuery)