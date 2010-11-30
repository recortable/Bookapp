(function() {
  $$.realtime = {};
  $$.realtime.connect = function() {
    var channel = "booka";
    Beacon.connect('5ed7901c', [channel], {
      log: true
    });
    Beacon.listen(function (command) {
      if (command.model_class == 'operation')
        executeOperation(command.model);
      else
        execute(command);
      print(command);
    });
  }

  function executeOperation(operation) {
    if (operation.repository_class == 'Project') {
      var url = "/projects/" + operation.repository_id + ".json" + "-DocumentPresenter";
      var presenter = $$.cache.get(url);
      if (presenter) {
        var op = presenter.operations.get(operation.id);
        console.log("REALTIME PREV OPERATION", op, presenter.operations);
        if (!op) {
          presenter.operations.add(new $$.Operation(operation));
        }
      }
    }
  }

  function execute(command) {
    if (command.model_class == 'article') {
      var url = "/projects/" + command.model.project_id + "/articles.json";
      var articles = $$.cache.get(url);
      if (articles && !articles.get(command.model.id)) {
        articles.add(new $$.Article(command.model));
      }
    }
  }

  function print(command) {
    var body
    var action = $$.i18n.action[command.action];
    if (command.model_class == 'operation') {
      body = "Ha " + action + " " + $$.i18n.tm(command.model.repository_class);
    } else {
      body = "Ha " + action + " " + $$.i18n.tm(command.model_class);
    }
    $$.messages.add(new $$.Message({
      user_name : command.user_name,
      body : body,
      created_at : new Date()
    }));
  }
})();