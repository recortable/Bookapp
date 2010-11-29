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
          console.log("SIGN OUT", data);
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
        email : this.$('#user_email').val(),
        password : this.$('#user_password').val()
      //        remember_me : this.$('#user_remember_me').attr('checked', true)
      };
      data = {
        authenticity_token : $$.workspace.get('csrf'),
        user : user
      }
      $.ajax({
        type : 'POST',
        url :'/users/sign_in.json',
        dataType : 'json',
        data : data,
        success : function(data) {
          var current_url = $$.router.current();
          console.log("LOGIN", data, current_url);
          $$.workspace.set(data);
          //$$.flash("Hola " + $$.user.name() + ". Bienvenidx a Plataformabooka.net")
          window.location.hash = window.location.hash;
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