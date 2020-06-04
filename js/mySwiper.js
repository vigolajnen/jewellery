(function () {

  var mySwiper = new Swiper('#new-products', {
    slidesPerView: 2,
    grabCursor: true,
    spaceBetween: 0,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }
  });


  var galleryThumbs = new Swiper('.product__slider-thumbs', {
      slidesPerView: 1,
      loop: true,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryLeft = new Swiper('.product__slider-left', {
      spaceBetween: 10,
      slidesPerView: 3,
      loop:true,
      loopedSlides: 3, //looped slides should be the same
      thumbs: {
        swiper: galleryThumbs,
      },
    });

})();
