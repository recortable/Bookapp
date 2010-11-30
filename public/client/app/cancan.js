(function() {

  var Ability = {
    Project : {
      create : function() {
        return userRol('admin', 'Necesitas ser administrador para crear un proyecto');
      },
      edit : function() {
        return hasUser();
      }
    }
  };

  $$.can = {
    setUser : function(user) {
      $$.can.current_user = user;
    },
    create : function(modelName, success) {
      authorize(modelName, 'create', success);
    },
    edit : function(model, success) {
      authorize(model.name, 'edit', success);
    }
  };

  function authorize(modelName, action, success) {
    if (Ability[modelName][action]()) {
      success();
    }
  }

  function hasUser() {
    if ($$.workspace.get('user_id')) {
      return true;
    } else {
      new $$.LogInPresenter();
      $$.flash("Necesitas entrar para poder hacer modificaciones");
      return false;
    }
  }

  function userRol(rol, message) {
    if (hasUser()) {
      var roles = $$.workspace.get('user_roles');
      if (roles == rol) {
        return true;
      } else {
        $$.flash(message);
      }
    }
    return false;
  }

})();