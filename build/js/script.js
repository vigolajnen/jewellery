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

  var btnMenu = document.querySelector('.page-header__btn-burger');
  var headerTop = document.querySelector('.page-header');

  if (btnMenu) {
    btnMenu.addEventListener('click', function (evt) {
      var target = evt.currentTarget;
      target.parentElement.parentElement.classList.toggle('page-header--mob');
      document.querySelector('.page').classList.add('page--overlay');

      if (document.querySelector('.page').classList.contains('page--overlay')) {
        document.querySelector('.page').classList.remove('overlay');
      }
    });
  }

  if (window.screen.width > 768) {
    document.querySelector('.page').classList.remove('page--overlay');
    if (headerTop.classList.contains('page-header--mob')) {
      headerTop.classList.remove('page-header--mob');
    }
  }

  window.onresize = function () {
    if (window.screen.width > 768) {
      document.querySelector('.page').classList.remove('page--overlay');
      if (headerTop.classList.contains('page-header--mob')) {
        headerTop.classList.remove('page-header--mob');
      }
    }
  };

  var acc = document.getElementsByClassName('accordion');
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function (evt) {
      var target = evt.target;
      var parent = target.parentElement;
      // console.log(target.tagName);
      // console.log(parent);
      if (target.tagName === 'use') {
        parent.parentElement.classList.toggle('accordion__item--active');
      } else if (target.tagName === 'accordion__item') {
        target.classList.toggle('accordion__item--active');
      } else if (target.className === 'accordion__item accordion__item--active') {
        target.classList.toggle('accordion__item--active');
      } else if (target.tagName === 'H3') {
        parent.classList.toggle('accordion__item--active');
      } else if (target.tagName === 'svg') {
        parent.classList.toggle('accordion__item--active');
      }
    });
  }

  var btnLogin = document.querySelector('#popup-login-btn');
  var btnFilter = document.querySelector('#popup-filter-btn');
  var btnAddCart = document.querySelector('#popup-add-cart-btn');


  var inputEmail = document.querySelector('input[type$="email"]');
  var inputPass = document.querySelector('input[type$="password"]');

  var isStorageSupport = true;
  var storageEmail = '';

  try {
    storageEmail = localStorage.getItem('inputEmail');
  } catch (err) {
    isStorageSupport = false;
  }

  function popupOpen(popup, id) {
    if (popup.getAttribute('id') === id) {
      popup.classList.add('popup--active');
      document.querySelector('.page').classList.add('page--overlay');
    }
  }

  function popupClose(popup) {
    var popupbtnClose = popup.querySelector('.popup__close');
    // document.addEventListener('keydown', function (evt) {
    //   evt.preventDefault();
    //   if (evt.keyCode === 27) {
    //     popup.classList.remove('popup--active');
    //     document.querySelector('.page').classList.remove('page--overlay');
    //   }
    // });

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

  var popups = document.querySelectorAll('.popup');
  if (popups) {
    popups.forEach(function (popup) {

      if (btnLogin) {
        btnLogin.addEventListener('click', function (evt) {
          evt.preventDefault();
          popupOpen(popup, 'popup-login');

          if (storageEmail) {
            inputEmail.value = storageEmail;
          } else {
            inputEmail.focus();
          }
        });
      }

      if (btnFilter) {
        btnFilter.addEventListener('click', function (evt) {
          evt.preventDefault();
          popupOpen(popup, 'popup-filter');
        });
      }

      if (btnAddCart) {
        btnAddCart.addEventListener('click', function (evt) {
          evt.preventDefault();
          popupOpen(popup, 'popup-add-cart');
        });
      }
      popupClose(popup);
    });
  }

  var formLogin = document.querySelector('#popup-login form');

  function generateError(text) {
    var error = document.createElement('div');
    error.className = 'error__text';
    error.innerText = text;
    return error;
  }

  function removeValidation(form) {
    var errors = form.querySelectorAll('.error__text');

    for (var x = 0; x < errors.length; x++) {
      errors[x].parentElement.classList.remove('error');
      errors[x].remove();
    }
  }

  function validate(email, form) {
   var email = form.querySelector('input[type$="email"]');
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) 
    {

      email.parentElement.classList.add('error');
        var error = generateError('Ошибка: заполните поле');
        email.parentElement.appendChild(error, email);
      return (false);
    }
  };


  formLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    var inputs = formLogin.querySelectorAll('input');
    var email = formLogin.querySelector('input[type$="email"]');
    removeValidation(formLogin);
    validate(email, formLogin);

    for (var j = 0; j < inputs.length; j++) {
      if (!inputs[j].value && !inputPass.value) {
        inputs[j].parentElement.classList.add('error');
        var error = generateError('Ошибка: заполните поле');
        inputs[j].parentElement.appendChild(error, inputs[j]);
      } else {

        if (isStorageSupport) {
          localStorage.setItem('inputEmail', inputEmail.value);
        }
      }
    }
  });

  formLogin.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var inputs = formLogin.querySelectorAll('input');
    
    removeValidation(formLogin);
    

    formLogin.submit();
  });

})();
