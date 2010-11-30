(function() {
  $$.i18n = {
    model : {
      'Paragraph' : {
        name : 'párrafo',
        singular : 'un'
      },
      'Decission' : {
        name:'decisión',
        singular : 'una'
      },
      'Reaction' : {
        name : 'accion a tomar',
        singular : 'una'
      },
      'Opinion' : {
        name: 'opinión',
        singular : 'una'
      },
      'Project' : {
        name : 'investigación',
        singular : 'una'
      },
      'Article' : {
        name : 'artículo',
        singular : 'un'
      },
      'Discussion' : {
        name : 'tema de debate',
        singular : 'un'
      }
    },
    action : {
      create : 'añadido',
      update : 'modificado'
    }
  }

  // translate model
  $$.i18n.tm  = function(name) {
    var model = $$.i18n.model[name];
    return model.singular + " " + model.name;
  }
})();