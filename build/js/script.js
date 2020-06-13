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
  var page = document.querySelector('.page');
  var btnMenu = document.querySelector('.page-header__btn-burger');
  var headerTop = document.querySelector('.page-header');

  if (btnMenu) {
    btnMenu.addEventListener('click', function () {
      headerTop.classList.toggle('page-header--mob');
      page.classList.toggle('page--overlay');
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

  // Login
  var btnLogin = document.querySelector('#popup-login-btn');
  var popupLogin = document.querySelector('#popup-login');
  var loginEmail = popupLogin.querySelector('input[name="login-email"]');
  var loginPassword = popupLogin.querySelector('input[name="login-password"]');
  var closePopupLogin = popupLogin.querySelector('.popup__close');
  var formLogin = popupLogin.querySelector('form');

  var btnFilter = document.querySelector('#popup-filter-btn');
  var popupFilter = document.querySelector('#popup-filter');
  if (popupFilter) {
    var closePopupFilter = popupFilter.querySelector('.popup__close');
  }

  var btnAddCart = document.querySelector('#popup-add-cart-btn');
  var popupAddCart = document.querySelector('#popup-add-cart');
  if (popupAddCart) {
    var closePopupAddCart = popupAddCart.querySelector('.popup__close');
  }

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('loginEmail');
  } catch (err) {
    isStorageSupport = false;
  }

  btnLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupLogin.classList.add('popup--active');
    page.classList.add('page--overlay');

    if (storage) {
      loginEmail.value = storage;
      loginPassword.focus();
    } else {
      loginEmail.focus();
    }
  });

  closePopupLogin.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupLogin.classList.remove('popup--active');
    page.classList.remove('page--overlay');
    loginEmail.parentElement.classList.remove('error');
    loginPassword.parentElement.classList.remove('error');
  });

  formLogin.addEventListener('submit', function (evt) {
    if (!loginEmail.value || !loginPassword.value) {
      evt.preventDefault();

      loginEmail.parentElement.classList.add('error');
      loginPassword.parentElement.classList.add('error');

    } else {
      if (isStorageSupport) {
        localStorage.setItem('loginEmail', loginEmail.value);
      }
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popupLogin.classList.contains('popup--active')) {
        popupLogin.classList.remove('popup--active');
      }
      page.classList.remove('page--overlay');
    }
  });

  popupLogin.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.className === 'popup popup--login popup--active') {
      popupLogin.classList.remove('popup--active');
    }
    page.classList.remove('page--overlay');
  });

  if (btnFilter) {
    btnFilter.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupFilter.classList.add('popup--active');
      page.classList.add('page--overlay');
    });

    closePopupFilter.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupFilter.classList.remove('popup--active');
      page.classList.remove('page--overlay');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popupFilter.classList.contains('popup--active')) {
          popupFilter.classList.remove('popup--active');
        }
        page.classList.remove('page--overlay');
      }
    });

    popupFilter.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.className === 'popup popup--filter popup--active') {
        popupFilter.classList.remove('popup--active');
      }
      page.classList.remove('page--overlay');
    });
  }

  if (btnAddCart) {
    btnAddCart.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupAddCart.classList.add('popup--active');
      page.classList.add('page--overlay');
    });

    closePopupAddCart.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupAddCart.classList.remove('popup--active');
      page.classList.remove('page--overlay');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popupAddCart.classList.contains('popup--active')) {
          popupAddCart.classList.remove('popup--active');
        }
        page.classList.remove('page--overlay');
      }
    });

    popupAddCart.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.className === 'popup popup--add-cart popup--active') {
        popupAddCart.classList.remove('popup--active');
      }
      page.classList.remove('page--overlay');
    });
  }
})();
