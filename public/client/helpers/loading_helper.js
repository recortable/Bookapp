(function($) {

  var requests = [];


  $$.loading = function(starts, url) {
    var index = -1;
    if (starts) {
      requests.push(url);
    } else if ((index = $.inArray(url, requests)) != -1) {
      requests.splice(index, 1);
    }
    var loader = $("#working");
    
    if (requests.length == 0) {
      loader.fadeOut();
    } else {
      loader.show();
    }
  };

  $$.loading.error = function(message) {
    $("#workin").html(message).show();
  }
})(window.jQuery);