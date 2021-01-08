const vibrateBtn = document.querySelector('.vibrate-button');
vibrateBtn.style.display = 'none';
if (navigator.vibrate) {

  vibrateBtn.style.display = 'block'
  console.log("vibrate available")

}
vibrateBtn.addEventListener('click', (e) => {
  window.navigator.vibrate(5000);
});