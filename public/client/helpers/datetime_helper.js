(function() {
  var NOW = new Date();
  var DISTANCE = 90000000;
  var date_regex = /(\d{4})-(\d{2})-(\d{2})\w(\d{2}):(\d{2})/
  $$.DateTime = {
    parse : function(repr) {
      console.log("DATE", repr);
      var date = Date.parse(repr);
      if (date > 0) {
        return new Date(date);
      }
      if (repr instanceof Date) {
        return repr;
      }
      var ext = repr.match(date_regex);
      console.log("DATE EXP", ext);
      return ext ? new Date(ext[1], ext[2] - 1, ext[3], ext[4], ext[5]) : null;
    },
    toString : function(stringDate) {
      var date = $$.DateTime.parse(stringDate);
      if (date) {
        if (Math.abs(NOW - date) < DISTANCE) {
          return dPad(date.getHours()) + ":" + dPad(date.getMinutes());
        } else {
          return dPad(date.getDate()) + "/" + dPad(date.getMonth()) + "/" + date.getFullYear();
        }
      }
      return '';
    }
  }

  function dPad(number) {
    return number < 10 ? "0" + number : number.toString();
  }
})();