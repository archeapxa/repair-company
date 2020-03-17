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
  var mySwiper = new Swiper ('.swiper-1', {

    loop: true,
    pagination: {
      el: '.projects__pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.projects__swiper-button-next',
      prevEl: '.projects__swiper-button-prev',
    },
    slidesPerView: 1,
  })

  var next = $('.projects__swiper-button-next');
  var prev = $('.projects__swiper-button-prev');
  var bullets = $('.projects__pagination');

  // console.log(prev)
  next.css('left', prev.width() + 21 + bullets.width() + 21 + prev.position().left)
  bullets.css('left', prev.width() + 21 + prev.position().left)

  var mySwiper2 = new Swiper ('.swiper-2', {

    pagination: {
      el: '.steps__pagination',
      type: 'bullets',
    },
    // navigation: {
    //   nextEl: '.steps__button-next',
    //   prevEl: '.steps__button-prev',
    // },
    controller: {
      control: mySwiper3,
    },

  })

    var mySwiper3 = new Swiper ('.swiper-3', {

    pagination: {
      el: '.steps__counter-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.steps__button-next',
      prevEl: '.steps__button-prev',
    },
    controller: {
      control: mySwiper2,
    },
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
              ' of ' +
              '<span class="' + totalClass + '"></span>';
  }

  })

  var next = $('.steps__button-next');
  var prev = $('.steps__button-prev');
  var bullets = $('.steps__pagination');

  bullets.css('left', prev.width() + 21 + prev.position().left)
  next.css('left', prev.width() + 21 + bullets.width() + 21 + prev.position().left)

  $("#steps-button-0").click(function(){
    mySwiper3.slideTo(0); 
  });
  $("#steps-button-1").click(function(){
    mySwiper3.slideTo(1); 
  });
  $("#steps-button-2").click(function(){
    mySwiper3.slideTo(2); 
    });
  $("#steps-button-3").click(function(){
    mySwiper3.slideTo(3); 
  });
  $("#steps-button-4").click(function(){
    mySwiper3.slideTo(4); 
  });
  $("#steps-button-5").click(function(){
    mySwiper3.slideTo(5); 
  });

  mySwiper3.on('slideChange', function () {
    var activeSlide = ('#steps-button-' + mySwiper3.realIndex);
    var prevSlide = ('#steps-button-' + mySwiper3.previousIndex)
    // console.log(activeSlide);
    // console.log(prevSlide);
    
    $(activeSlide).removeClass('inactive');
    $(prevSlide).addClass('inactive');

  });

  new WOW().init();


    // mask for phone
    $('[type=tel]').mask('+7 (000) 00-00-000', {placeholder: "+7 (___) __-__-___"});

  $('.modal__form').validate({
    errorClass: 'invalid',
    rules: {
      // simple rule, converted to {required:true}
      userName: {
        required: true,
        rangelength: [2, 15]
      },
      // compound rule
      userPhone: "required",
      userEmail: {
        required: true,
        email: true
      }
    }, // messages
    errorElement: 'div',
    messages: {
      userName: {
        required: "Заполните поле",
        rangelength: "Имя не короче 2 символов и не длиннее 15 символов"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      }
    }
  });

  

// validation for control section form

$('.control__form').validate({
  errorClass: 'invalid',
  rules: {
    // simple rule, converted to {required:true}
    controlName: {
      required: true,
      rangelength: [2, 15]
    },
    // compound rule
    userPhone: "required",
  }, // messages
  errorElement: 'div',
  messages: {
    controlName: {
      required: "Заполните поле",
      rangelength: "Имя не короче 2 символов и не длиннее 15 символов"
    },
    controlPhone: "Заполните поле",
  }
});

});