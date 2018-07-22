$(".js-header-slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay:true,
  autoplaySpeed: 7000,
  fade: true,
  cssEase: 'linear',
  dots: false,
  prevArrow: false,
  nextArrow: false,
  zIndex: 0,
  draggable: false
});

$('.js-toggle-menu').on('click', () => {
  $('.header__nav-container').toggleClass('header__nav-container--opened')
});
