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

})();
