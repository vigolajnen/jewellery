(function () {
  
  if ('NodeList' in window && !NodeList.prototype.forEach) {

    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

    var phoneInputs = document.querySelectorAll('input[name$="phone"]');
  phoneInputs.forEach(function (phoneInput) {
    phoneInput.addEventListener('keydown', function (event) {
      if (!(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
      var mask = '+7 (111) 111 11 11'; // Задаем маску
    
      if (/[0-9\+\ \-\(\)]/.test(event.key)) {
        // Здесь начинаем сравнивать this.value и mask
        // к примеру опять же
        var currentString = this.value;
        var currentLength = currentString.length;
        if (/[0-9]/.test(event.key)) {
          if (mask[currentLength] == '1') {
            this.value = currentString + event.key;
          } else {
            for (var i = currentLength; i < mask.length; i++) {
              if (mask[i] == '1') {
                this.value = currentString + event.key;
                break;
              }
              currentString += mask[i];
            }
          }
        }
      }
    });
  });
})();
