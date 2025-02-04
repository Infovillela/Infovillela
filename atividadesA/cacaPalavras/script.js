// script.js


  document.querySelectorAll('.color-button').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('clicked');
    });
  });

  