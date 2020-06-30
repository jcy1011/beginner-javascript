import handleResult from './handlers';
import { colorsByLength, isDark } from './colors';

const colorsEl = document.querySelector('.colors');

function displayColors(colors) {
  return colors
    .map(
      color =>
        `<span class="color ${color} ${
          isDark(color) ? 'dark' : ''
        }" style="background: ${color}">${color}</span>`
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  // see if user's browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('Sorry, your browser does not support speech recognition');
    return;
  }
  console.log('Starting...');
  const recognition = new SpeechRecognition();
  // continue looking for speech recognition rather than stop
  recognition.continuous = true;
  // return as speaking rather than wait for end of speaking
  recognition.interimResults = true;
  // NOTE: there is no addEventListener on recognition's prototype
  // console.log(recognition);
  // Listen for event
  recognition.onresult = handleResult;
  recognition.start();
}

start();
colorsEl.innerHTML = displayColors(colorsByLength);
