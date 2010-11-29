(function() {
  window.log = function() {
    console.log( Array.prototype.slice.call(arguments) );
  };

  window.assert = function() {
  };
})();