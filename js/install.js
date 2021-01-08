let deferredPrompt;
const modal = document.querySelector('.add-to-homepage');
const addBtn = document.querySelector('.add-button');
const cancelBtn = document.querySelector('.cancel-button');
modal.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  modal.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    modal.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });

  });
  cancelBtn.addEventListener('click', (e) => {
    modal.style.display = 'none'
  })
});