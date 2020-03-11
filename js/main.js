document.addEventListener("DOMContentLoaded", function(event) { 
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

  document.addEventListener('keydown', removeModal);


  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      removeModal()
    }
  });


  // modal.addEventListener('click', (e) => {
    
  //     modal.classList.remove('modal--visible');//удаляем класс при отпускании esc
    
  // })

  // document.addEventListener('click', (e) => {
  //   if (e.currentTarget.className != 'modalDialog') {
  //     modal.classList.remove('modal--visible');
  //   } 
  // })

});

  // modalBtn.forEach(element => {
  //   element.addEventListener('click', switchModal); // переключаем по клику на любой из елементов подходящих под modalBtn
  // });


  // modalBtn.forEach(element => {
  //   element.addEventListener('click', switchModal); // переключаем по клику на любой из елементов подходящих под modalBtn
  // });




    // if(e.keyCode === 27) {
    //   modal.classList.toggle('modal--visible');
    //   console.log('e.keyCode');
    // }
