(function() {
  $$.RealTime = {};
  $$.RealTime.connect = function() {
    var channel = "booka";
    Beacon.connect('5ed7901c', [channel], {
      log: true
    });
    Beacon.listen(function (message) {

      });
  }
})();