(function() {
  function loadBooks(project_id, clear, callback) {
    $$.workspace.setProjectId(project_id);
    var url = "/projects/" + project_id + "/books.json";
    var options = {
      project_id : project_id
    };
    $$.Cache.collection(url, $$.Books, options, function(books) {
      $$.books = books;
      $$.Cache.presenter(url + "Presenter", $$.BooksPresenter, $$.books, function(presenter) {
        $$.booksPresenter = presenter;
        $$.layout.showInBrowser(presenter);
        callback && callback();
      });
    });
    clear && $$.layout.clear();
  }

  $$.BooksController = Backbone.Controller.extend({
    routes: {
      'investigaciones/:project_id/indice': 'index',
      'investigaciones/:project_id/indice/crear' : 'new',
      'investigaciones/:project_id/indice/:book_id': 'show',
      'investigaciones/:project_id/indice/:book_id/editar': 'edit'
    },
    index : function(project_id) {
      log("controller#books", project_id);
      loadBooks(project_id, true);
    },
    show : function(project_id, book_id) {
      if ($$.Util.isNumber(book_id)) {
        log("books#show");
        loadBooks(project_id, false, function() {
          var url = "/projects/" + project_id + "/books/" + book_id + ".json";
          $$.Cache.refresh(url, $$.books, book_id, function (book) {
            var token = url + "-DocumentPresenter";
            $$.Cache.presenter(token, $$.DocumentPresenter, book, function (presenter) {
              presenter.show();
            });
          });
        });
      }
    },
    'new' : function(project_id) {
      loadBooks(project_id, false, function() {
        log("books#new");
        $$.editor = new $$.BookEditor({
          model :new $$.Book({
            project_id : project_id
          })
        });
        $$.layout.show($$.editor);
      });
    },
    edit : function(project_id, book_id) {
      loadBooks(project_id, false, function() {
        log("books#edit");
        var url = "/projects/" + project_id + "/books/" + book_id + ".json";
        $$.Cache.refresh(url, $$.books, book_id, function (book) {
          $$.editor = new $$.BookEditor({
            model : book
          });
          $$.layout.show($$.editor);
        });
      });
    }
  });


})();