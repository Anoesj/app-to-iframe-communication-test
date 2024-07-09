import '../src/style.css'
import { getTimestamp } from '../src/utils';

// See: https://blog.logrocket.com/ultimate-guide-iframes/

const output = document.getElementById('output');

const form = document.querySelector('form');
const input = document.getElementById('input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  window.top.postMessage(input.value, '*');
  input.value = '';
}, { passive: false });

window.onmessage = function (event) {
  console.log(`[iframe] Incoming event:`, event);
  output.innerHTML += `<div class="event"><span class="timestamp">${getTimestamp()}</span><span class="message">${event.data}<span><div>`;
};