'use strict';

(function () {

  if ('NodeList' in window && !NodeList.prototype.forEach) {

    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }


  var accordion = document.querySelector('.accordion');
  var accItemActive = document.querySelector('.accordion__item.accordion__item--active');

  if (accordion) {
    accordion.addEventListener('click', function (evt) {
      evt.preventDefault();

      var target = evt.currentTarget;

      var parent = target.parentElement;

      if (parent.className === 'accordion__header') {
        parent.parentElement.classList.toggle('accordion__item--active');
      } else if (parent.className === 'accordion__item' || target.className === 'accordion__item') {
        parent.classList.toggle('accordion__item--active');

      } else if (accItemActive) {
        parent.classList.remove('accordion__item--active');
      }
    });
  }



  var page = document.querySelector('.page');
  var popupOpenBtn = document.querySelector('.nav__btn-popup');
  var popupCloseBtn = document.querySelector('.popup__btn-close');
  var popupForm = document.querySelector('#order-call');
  var inputName = document.querySelector('input#popup-name');
  var inputPhone = document.querySelector('input#popup-phone');
  var popupApplication = document.querySelector('#application-accepted');
  var forms = document.querySelectorAll('form');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  try {
    storageName = localStorage.getItem('inputName');
    storagePhone = localStorage.getItem('inputPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  function maskPhone(inputPhoneName, mask) {
    var textArr = document.querySelectorAll(inputPhoneName);

    textArr.forEach(function (text) {
      // var text = document.querySelector(inputPhoneName);
      var value = text.value;

      var literalPattern = /[0\*]/;
      var numberPattern = /[0-9]/;
      var newValue = '';

      for (var vId = 0, mId = 0; mId < mask.length;) {

        if (mId >= value.length) {
          break;
        }

        if (mask[mId] === '0' && value[vId].match(numberPattern) === null) {
          break;
        }

        // Found a literal
        while (mask[mId].match(literalPattern) === null) {
          if (value[vId] === mask[mId]) {
            break;
          }

          newValue += mask[mId++];
        }

        newValue += value[vId++];
        mId++;

      }

      text.value = newValue;
    });

  }

  var phones = document.querySelectorAll('input[name$="phone"]');
  phones.forEach(function (phone) {
    phone.addEventListener('keyup', function () {
      maskPhone('input[name$="phone"]', '+7(000) 000 00 00');
    });
    phone.addEventListener('input', function () {
      // console.log(phone.value.length);
      if (phone.value.length < 17) {
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

  if (popupOpenBtn) {
    popupOpenBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      poupOpen(popupForm);

      if (storageName) {
        inputName.value = storageName;
      } else if (storagePhone) {
        inputPhone.value = storagePhone;
        inputName.focus();
      }

    });
  }

  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', function (evt) {
      evt.preventDefault();

      popupClose(popupForm);

    });
  }

  function poupOpen(popup) {
    popup.classList.add('popup--active');
    page.classList.add('page--overlay');
  }

  function popupClose(popup, form) {
    document.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');
        form.submit();
        // form.reset();
      }
    });

    popup.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;

      if ((target.className === 'popup popup--active') || (target.tagName === 'BUTTON')) {
        popup.classList.remove('popup--active');
        page.classList.remove('page--overlay');

        form.submit();
        // form.reset();
      }
    });
  }

  function generateError(text) {
    var error = document.createElement('div');
    error.className = 'error__text';
    error.innerText = text;
    return error;
  }

  function checkFieldsPresence(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value || (inputs[i].type === 'checkbox' && !inputs[i].checked)) {
        inputs[i].parentElement.classList.add('error');
        var error = generateError('Ошибка: заполните поле');
        inputs[i].parentElement.appendChild(error, inputs[i]);
      }
      if (inputs[i].getAttribute('placeholder') === 'телефон') {
        if (inputs[i].value.length < 17) {
          inputs[i].setCustomValidity('Введите номер телефона полностью');
        } else {
          inputs[i].setCustomValidity('');
        }
      }
    }
  }

  function removeValidation(form) {
    var errors = form.querySelectorAll('.error__text');

    for (var i = 0; i < errors.length; i++) {
      errors[i].parentElement.classList.remove('error');
      errors[i].remove();
    }
  }

  forms.forEach(function (form) {
    var inputs = form.querySelectorAll('input');
    form.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        removeValidation(form);
        checkFieldsPresence(inputs);
      }
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      // валидируем форму;

      if (!inputName.value) {
        evt.preventDefault();
        inputName.setCustomValidity('Нужно ввести имя');

      } else if (!inputPhone.value && inputPhone.value.length < 17) {
        inputPhone.setCustomValidity('Введите номер телефона полностью');
      } else {
        inputPhone.classList.remove('invalid');
        if (isStorageSupport) {
          localStorage.setItem('inputName', inputName.value);
          localStorage.setItem('inputPhone', inputPhone.value);
        }
      }

      // показываем попап;
      poupOpen(popupApplication);

      if (popupApplication.classList.contains('popup--active') && popupForm.classList.contains('popup--active')) {
        popupForm.classList.remove('popup--active');
        popupApplication.classList.add('popup--application');
      }

      popupClose(popupApplication, form);
      popupApplication.classList.remove('popup--application');

      return false; // предотвращаем отправку формы и перезагрузку страницы
    });
  });
})();
