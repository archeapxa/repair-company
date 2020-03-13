/*document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  const modal = document.querySelector('.modal');
  const modalDialog = document.querySelector('.modal__dialog');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  }
  const removeModal = () => {
    modal.classList.remove('modal--visible');
  }

  modalBtn.forEach(element => {
    element.addEventListener('click', () => {
      modal.classList.add('modal--visible');
    }); // добавляем класс
  });

  closeBtn.addEventListener('click', switchModal); // переключаем(закрываем) модал по клику на closeBtn

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      removeModal()
    }
  });


  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      removeModal()
    }
  });


})*/

$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function() {
    modal.toggleClass('modal--visible');
  });

  $(document).mouseup(function (e) { //переписанная функция закрытия окна по клику вне его. Переделанный код из интернетиков...
    var div = $('.modal__dialog');
    if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
          modal.removeClass('modal--visible');
		}
  });

  $(document).keydown(function(eventObject){ //закрытие окна по esc. Еще одна копипаста
    if ( eventObject.which == 27 ) { // нажата клавиша Esc
      modal.removeClass('modal--visible');// ваша функция закрытия окна
    };
  });



  $(function() {  //появление кнопки Вверх при прокрутке страницы, промотка страницы вверх при нажатии
    $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
    $('#toTop').fadeIn();
    } else {
    $('#toTop').fadeOut();
    }
    });
    $('#toTop').click(function() {
    $('body,html').animate({scrollTop:0},800);
    });
    });


    //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
  })

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  console.log(prev)
  next.css('left', prev.width() + 10 + bullets.width() + 10 + prev.position().left)
  bullets.css('left', prev.width() + 10 + prev.position().left)

});