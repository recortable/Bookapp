(function() {
  var markdown = new Showdown.converter();

  $$.filter = {
    markdown : markdown.makeHtml,
    none : function(text) {
      return text;
    },
    html : function(text) {
      return text;
    }
  }
})();