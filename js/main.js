document.addEventListener("DOMContentLoaded", function(event) { 
  //do work
  const modal = document.querySelector('.modal');
  const modalDialog = document.querySelector('.modal__dialog');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal--visible');
  }

  modalBtn.forEach(element => {
    element.addEventListener('click', () => {
      modal.classList.add('modal--visible');
    }); // добавляем класс
  });

  closeBtn.addEventListener('click', switchModal); // переключаем(закрываем) модал по клику на closeBtn

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      modal.classList.remove('modal--visible');//удаляем класс при отпускании esc
    }
  });

  

});

  // modalBtn.forEach(element => {
  //   element.addEventListener('click', switchModal); // переключаем по клику на любой из елементов подходящих под modalBtn
  // });


  // modalBtn.forEach(element => {
  //   element.addEventListener('click', switchModal); // переключаем по клику на любой из елементов подходящих под modalBtn
  // });


  // document.addEventListener('click', (e) => {
  //   if (e.target.className != 'modalDialog') {
  //     modal.classList.toggle('modal--visible');
  //   } 
  // })

    // if(e.keyCode === 27) {
    //   modal.classList.toggle('modal--visible');
    //   console.log('e.keyCode');
    // }
