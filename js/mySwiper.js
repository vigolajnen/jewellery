(function () {

  var mySwiper = new Swiper('#new-products', {
    slidesPerView: 2,
    grabCursor: true,
    spaceBetween: 15,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 20,

        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                    ' of ' +
                    '<span class="' + totalClass + '"></span>';
          },
        },
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  });

  var galleryThumbs = new Swiper('.product__slider-thumbs', {
    slidesPerView: 1,
    loop: true,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
                ' of ' +
                '<span class="' + totalClass + '"></span>';
      },
    },
  });

  var galleryLeft = new Swiper('.product__slider-left', {
    spaceBetween: 14,
    slidesPerView: 3,
    loop:true,
    loopedSlides: 3, //looped slides should be the same
    thumbs: {
      swiper: galleryThumbs,
    },

    breakpoints: {
      1024: {
        slidesPerColumnFill: "column",
        direction: "vertical",
        slidesPerColumn: 1,
        slidesPerRow: 3,
      },
    }
  });

})();
