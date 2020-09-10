
const vibrateBtn = document.querySelector('.vibrate-button');

vibrateBtn.addEventListener('click', (e) => {
  window.navigator.vibrate(5000);
});