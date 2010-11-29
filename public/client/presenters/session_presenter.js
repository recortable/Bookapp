(function() {

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
      $.ajax({
        type: 'GET',
        url : "/users/sign_out.json",
        success: function(data) {
          $$.workspace.set(data);
          $$.router.go('');
        }
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
      $.ajax({
        type : 'POST',
        url :'/users/sign_in.json',
        dataType : 'json',
        data : user,
        success : function(data) {
          $$.workspace.set(data);
          $$.router.go('');
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
      var user = {
        email : this.$('#user_email').val(),
        password : this.$('#user_password').val(),
        password_confirmation : this.$('#user_password_confirmation').val()
      };
      $.ajax({
        type : 'POST',
        url :'/users.json',
        dataType : 'json',
        data : user,
        success : function(data) {
          $$.workspace.set(data);
          $$.router.go('');
        }
      });
      return false;
    }
  });
  
})();