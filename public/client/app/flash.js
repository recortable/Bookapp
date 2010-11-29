(function() {

  var message = null;

  $$.flash = function(value, type) {
    if (value) 
      setFlash(value, type);
    else
      clearFlash();
  };
  
  function setFlash(value, type) {
    var div = $$.Render.div('flash');
    type && div.addClass(type);
    div.html(value);
    $("#booka-status").html(div).animate({
      backgroundColor: '#FFFFFF'
    }, 1000)
    .animate({
      backgroundColor: '#FEFF8F'
    });
  }

  function clearFlash() {
    $("#booka-status").empty();
  }
})();