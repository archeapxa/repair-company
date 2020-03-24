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


//появление кнопки Вверх при прокрутке страницы, промотка страницы вверх при нажатии
  $(function () { 
    var windowHeight = $(window).height();
    $('.hero__scroll-down').click(function () {
      $('body,html').animate({
        scrollTop: windowHeight - 200
      }, 1500);
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



  var mySwiper4 = new Swiper('.swiper-4', {
    loop: true,
    speed: 800,
    navigation: {
      nextEl: '.stylisation__next',
      prevEl: '.stylisation__prev',
    },
    slidesPerView: 1,

  })


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
          // $('.modal__form').css('display', 'none');
          // $('.modal__title').html('Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a>');
          $('.modal__title--success').css('margin-top', '2rem');
          modalSuccess.addClass('modal--visible');
          ym(61217218,'reachGoal','request'); return true;
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
          // $('.control__form').replaceWith('<h3 class="control__success">Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a></h3>');
          $('.modal__title--success').css('margin-top', '2rem');
          modalSuccess.addClass('modal--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        },
      });
    }
  });

  // validate for order section
  $('.order__form').validate({
    errorClass: 'invalid',
    ignore: ":disabled",
    rules: {
      // simple rule, converted to {required:true}
      orderName: {
        required: true,
        rangelength: [2, 15]
      },
      // compound rule
      orderPhone: "required",
      orderEmail: {
        required: true,
        email: true
      },
      policyCheckbox: {
        required: true,
      },
    }, // messages
    errorElement: 'div',
    messages: {
      orderName: {
        required: "Заполните поле",
        rangelength: "Имя не короче 2 символов и не длиннее 15 символов"
      },
      orderPhone: "Заполните поле",
      orderEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      },
      orderCheckbox: {
        required: "Требуется соглашение с обработкой данных"
      }
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "sendOrder.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          // $('.order__form').css('display', 'none');
          // $('.order__title').html('Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a>');
          // $('.order__title').css('margin-top', '2rem');
          $('.modal__title--success').css('margin-top', '2rem');
          modalSuccess.addClass('modal--visible');
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
      footerCheckbox: "required",
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
      footerCheckbox: "Требуется соглашение с обработкой данных",
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
          // $('.footer__form').replaceWith('<h3 class="footer__success">Заявка отправлена, мы свяжемся с вами через 10 минут <br><br> А пока можете подписаться на нашу <a class="modal-success__link" href="#">группу Вконтакте</a></h3>');
          $('.modal__title--success').css('margin-top', '2rem');
          modalSuccess.addClass('modal--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        },
      });
    }
  });

  // заставляем яндекс карты грузиться при клике
  var spinner = $('.map-container').children('.loader');
  //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
  var check_if_load = false;
  //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
  var myMapTemp, myPlacemarkTemp;

  //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
  function init() {
    var myMapTemp = new ymaps.Map("map", {
      center: [47.244729, 39.723187], // координаты центра на карте
      zoom: 13, // коэффициент приближения карты
      controls: ['zoomControl'] // выбираем только те функции, которые необходимы при использовании
    });
    var myPlacemarkTemp = new ymaps.Placemark([47.244729, 39.723187], {
      balloonContent: "офис 2112",
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
      iconImageOffset: [-16, -32],
    });
    myMapTemp.behaviors.disable('scrollZoom');
    myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

    // Решение по callback-у для определения полной загрузки карты
    waitForTilesLoad(layer).then(function () {
      spinner.removeClass('is-active');
      // Скрываем индикатор загрузки после полной загрузки карты
    });
  }

  // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      var tc = getTileContainer(layer),
        readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function () {
          resolve();
        });
      }
    });
  }

  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
          layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }

  // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
  function loadScript(url, callback) {
    var script = document.createElement("script");

    if (script.readyState) { // IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else { // Другие браузеры
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
  var ymap = function () {
    $('.map-container').mouseenter(function () {
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

        // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true;

        // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');

        // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?apikey=413c87fc-f285-4212-abc8-c324c98ec8c8&lang=ru_RU&amp;loadByRequire=1", function () {
          // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
          ymaps.load(init);
        });
      }
    });
  }

  $(function () {

    //Запускаем основную функцию
    ymap();

  });


  $(function () {

    $('ul.stylisation__list').on('click', 'li:not(.active)', function () {
      $(this).addClass('active').siblings().removeClass('active');
      $('[data-tab-1]').find('div.tabs__content').hide().removeClass('tabs--active').eq($(this).index()).fadeIn(250).addClass('tabs--active');
      $('[data-tab-2]').find('div.tabs__content').hide().removeClass('tabs--active').eq($(this).index()).fadeIn(250).addClass('tabs--active');
    })

  });

// scroll

  $("body").on('click', '[href*="#"]', function(e){
    var fixed_offset = 150;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
  });




});