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

      var target = evt.target;

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

  function popupOpen(popup, id) {
    if (popup.getAttribute('id') === id) {
      popup.classList.add('popup--active');
      document.querySelector('.page').classList.add('page--overlay');
    }
  }

  function popupClose(popup, id) {
    var popupbtnClose = popup.querySelector('.popup__close');
    if (popup.getAttribute('id') === id) { 
      document.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.keyCode === 27) {
          popup.classList.remove('popup--active');
          document.querySelector('.page').classList.remove('page--overlay');
        }
      });

      popupbtnClose.addEventListener('click', function (evt) {
        evt.preventDefault();

        popup.classList.remove('popup--active');
        document.querySelector('.page').classList.remove('page--overlay');
      });

      popup.addEventListener('click', function (evt) {
        evt.preventDefault();
        var target = evt.target;
        
        if (target.classList.contains('popup--active')) {
          popup.classList.remove('popup--active');
          document.querySelector('.page').classList.remove('page--overlay');
        }
      });
    }
  }

  var btnLogin = document.querySelector('#popup-login-btn');
  var btnFilter = document.querySelector('#popup-filter-btn');
  var btnAddCart = document.querySelector('#popup-add-cart-btn');
  var popups = document.querySelectorAll('.popup');
  if (popups) {
    popups.forEach(function (popup) {

      if (btnLogin) {
        btnLogin.addEventListener('click', function (evt) {
          evt.preventDefault();
          popupOpen(popup, 'popup-login');
          popupClose(popup, 'popup-login');
        });
      }

      if (btnFilter) {
        btnFilter.addEventListener('click', function (evt) {
          evt.preventDefault();
          popupOpen(popup, 'popup-filter');
          popupClose(popup, 'popup-filter');
        });
      }

      if (btnAddCart) {
        btnAddCart.addEventListener('click', function (evt) {
          evt.preventDefault();
          popupOpen(popup, 'popup-add-cart');
          popupClose(popup, 'popup-add-cart');
        });
      }
    });
  }

  var forms = document.querySelectorAll('form');
  var inputEmail = document.querySelector('input[type="email"]');
  var formLogin = document.querySelector('#popup-login form');

  var isStorageSupport = true;
  var storageEmail = '';

  try {
    storageEmail = localStorage.getItem('inputEmail');
  } catch (err) {
    isStorageSupport = false;
  }
  
  function checkFieldsPresence(inputs) {
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        console.log(inputs[i].value.length);
        // inputs[i].setCustomValidity('Ошибка: заполните поле');
      } else {
        if (isStorageSupport) {
          localStorage.setItem('inputEmail', inputEmail.value);
        }
      }
    }
  }

  forms.forEach(function (form) {
    var inputs = form.querySelectorAll('input');
    form.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        for (var i = 0; i < inputs.length; i++) {
          if (!inputs[i].value) {
            console.log(inputs[i].value.length);
            // inputs[i].setCustomValidity('Ошибка: заполните поле');
          } else {
            if (isStorageSupport) {
              localStorage.setItem('inputEmail', inputEmail.value);
            }
          }
        }
      }
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      // валидируем форму;

      for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
          console.log(inputs[i].value.length);
          // inputs[i].setCustomValidity('Ошибка: заполните поле');
        } else {
          if (isStorageSupport) {
            localStorage.setItem('inputEmail', inputEmail.value);
            form.submit();
          }
        }
      }

      return false; // предотвращаем отправку формы и перезагрузку страницы
    });
  });

})();
