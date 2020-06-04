
  if ('NodeList' in window && !NodeList.prototype.forEach) {

    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

function mask(inputName, mask, evt) {
  try {
    var text = document.getElementById(inputName);
    var value = text.value;
    

    // If user pressed DEL or BACK SPACE, clean the value
    try {
      var e = (evt.which) ? evt.which : event.keyCode;
      if ( e == 46 || e == 8 ) {
        text.value = "";
        return;
      }
    } catch (e1) {}

    var literalPattern=/[0\*]/;
    var numberPattern=/[0-9]/;
    var newValue = "";

    for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
      
      if (mId >= value.length)
        break;

      // Number expected but got a different value, store only the valid portion
      if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
        break;
      }

      // Found a literal
      while (mask[mId].match(literalPattern) == null) {
        if (value[vId] === mask[mId])
          break;

        newValue += mask[mId++];
      }

      newValue += value[vId++];
      mId++;

    }

    text.value = newValue;
    
  } catch(e) {}
}

  var phones = document.querySelectorAll('input[name$="phone"]');
  phones.forEach(function (phone) {
    phone.addEventListener('keyup', function (evt) {
      evt.preventDefault();
      mask('phone', '+7(000)000 00 00', evt);
    });
    phone.addEventListener('input', function () {
      // console.log(phone.value.length);
      if (phone.value.length < 16) {
        phone.setCustomValidity('Введите номер телефона полностью');

      } else {
        phone.setCustomValidity('');
      }
    });

    phone.addEventListener('focus', function (evt) {
      evt.preventDefault();
      phone.parentElement.classList.add('input-phone');
    });

    phone.addEventListener('blur', function (evt) {
      evt.preventDefault();
      phone.parentElement.classList.remove('input-phone');
    });

  });