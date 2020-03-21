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
  var modal = $('[data-modal]'),
    modalBtn = $('[data-toggle=modal]'),
    closeBtn = $('.modal__close'),
    modalSuccess = $('[data-success]');

  modalBtn.on('click', function () {
    modal.addClass('modal--visible');
  });
  closeBtn.on('click', function () {
    modal.removeClass('modal--visible');
    modalSuccess.removeClass('modal--visible');
  });

  $(document).mouseup(function (e) { //переписанная функция закрытия окна по клику вне его. Переделанный код из интернетиков...
    var div = $('.modal__dialog');
    if (!div.is(e.target) // если клик был не по нашему блоку
      &&
      div.has(e.target).length === 0) { // и не по его дочерним элементам
      modal.removeClass('modal--visible');
    }
  });

  $(document).keydown(function (eventObject) { //закрытие окна по esc. Еще одна копипаста
    if (eventObject.which == 27) { // нажата клавиша Esc
      modal.removeClass('modal--visible'); // ваша функция закрытия окна
    };
  });



  $(function () { //появление кнопки Вверх при прокрутке страницы, промотка страницы вверх при нажатии
    $(window).scroll(function () {
      if ($(this).scrollTop() != 0) {
        $('#toTop').fadeIn();
      } else {
        $('#toTop').fadeOut();
      }
    });
    $('#toTop').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
    });
  });


  //initialize swiper when document ready
  var mySwiper = new Swiper('.swiper-1', {

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

  var mySwiper2 = new Swiper('.swiper-2', {
    effect: 'fade',
    speed: 800,
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
    fadeEffect: {
      crossFade: true
    }

  })

  var mySwiper3 = new Swiper('.swiper-3', {
    effect: 'fade',
    speed: 800,
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
    },
    fadeEffect: {
      crossFade: true
    }

  })

  var next = $('.steps__button-next');
  var prev = $('.steps__button-prev');
  var bullets = $('.steps__pagination');

  bullets.css('left', prev.width() + 21 + prev.position().left)
  next.css('left', prev.width() + 21 + bullets.width() + 21 + prev.position().left)

  $("#steps-button-0").click(function () {
    mySwiper3.slideTo(0);
  });
  $("#steps-button-1").click(function () {
    mySwiper3.slideTo(1);
  });
  $("#steps-button-2").click(function () {
    mySwiper3.slideTo(2);
  });
  $("#steps-button-3").click(function () {
    mySwiper3.slideTo(3);
  });
  $("#steps-button-4").click(function () {
    mySwiper3.slideTo(4);
  });
  $("#steps-button-5").click(function () {
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
  $('[type=tel]').mask('+7 (000) 000-00-00', {
    placeholder: "+7 (___) ___-__-__"
  });


  // валидация форм
  $('.modal__form').validate({
    errorClass: 'invalid',
    ignore: ":disabled",
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
      },
      policyCheckbox: {
        required: true,
      },
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
      },
      policyCheckbox: {
        required: "Требуется соглашение с обработкой данных"
      }
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "sendModal.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.modal__form').css('display', 'none');
          $('.modal__title').html('Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a>');
          $('.modal__title').css('margin-top', '2rem');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        },
      });
    }
  });



  // validation for control section form

  $('.control__form').validate({
    errorClass: 'invalid invalid--centered',
    ignore: ":disabled",
    rules: {
      // simple rule, converted to {required:true}
      controlName: {
        required: true,
        rangelength: [2, 15]
      },
      // compound rule
      controlPhone: "required",
      controlCheckbox: {
        required: true,
      },
    }, // messages
    errorElement: 'div',
    messages: {
      controlName: {
        required: "Заполните поле",
        rangelength: "Имя не короче 2 символов и не длиннее 15 символов"
      },
      controlPhone: "Заполните поле",
      controlCheckbox: {
        required: "Требуется соглашение с обработкой данных"
      },
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "sendControl.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.control__form').replaceWith('<h3 class="control__success">Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a></h3>');

        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        },
      });
    }
  });

  // validation for footer section form

  $('.footer__form').validate({
    errorClass: 'invalid invalid--centered',
    ignore: ":disabled",
    rules: {
      // simple rule, converted to {required:true}
      footerName: {
        required: true,
        rangelength: [2, 15]
      },
      // compound rule
      footerPhone: "required",
      footerCheckbox : "required",
      footerAsk: {
        required: true,
        rangelength: [10, 255]
      }
    }, // messages
    errorElement: 'div',
    messages: {
      footerName: {
        required: "Заполните поле",
        rangelength: "Имя не короче 2 символов и не длиннее 15 символов"
      },
      footerPhone: "Заполните поле",
      footerCheckbox : "Требуется соглашение с обработкой данных",
      footerAsk: {
        required: "Заполните поле",
        rangelength: "Не короче 10 символов"
      }
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "sendFooter.php",
        data: $(form).serialize(),
        success: function (response) {
          // alert('Форма отправлена, мы свяжемся с вами через 10 минут');
          $(form)[0].reset();
          $('.footer__form').replaceWith('<h3 class="footer__success">Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a></h3>');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        },
      });
    }
  });

  // yandex map

  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [47.244729, 39.723187],
        controls: [],
        zoom: 13
      }),

      // // Создаём макет содержимого.
      // MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      //   '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      // ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Repair Company',
        balloonContent: 'офис 2112'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map-mark.png',
        // Размеры метки.
        iconImageSize: [32, 32],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
      });

    myMap.behaviors
      // Отключаем часть включенных по умолчанию поведений:
      //  - drag - перемещение карты при нажатой левой кнопки мыши;
      //  - magnifier.rightButton - увеличение области, выделенной правой кнопкой мыши.
      .disable(['drag', 'rightMouseButtonMagnifier'])

    myMap.geoObjects
      .add(myPlacemark);
  });


});