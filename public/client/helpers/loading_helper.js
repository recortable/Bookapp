(function($) {

  var requests = [];


  $$.loading = function(url) {
    var index = $.inArray(url, requests);
    if (index == -1) {
      requests.push(url);
    } else {
      requests.splice(index, 1);
    }
    console.log("LOAD " + url, -1 * index, requests);

    var loader = $("#working");
    
    if (requests.length == 0) {
      loader.fadeOut();
    } else {
      loader.show();
    }
  }
})(jQuery);