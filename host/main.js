import '../src/style.css'
import { getTimestamp } from '../src/utils';

// See: https://blog.logrocket.com/ultimate-guide-iframes/

const iframe = document.querySelector('iframe');

const form = document.querySelector('form');
const input = document.getElementById('input');
const output = document.getElementById('output');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  iframe.contentWindow.postMessage(input.value, '*');
  input.value = '';
}, { passive: false });

window.onmessage = function (event) {
  console.log(`[host] Incoming event:`, event);
  output.innerHTML += `<div class="event"><span class="timestamp">${getTimestamp()}</span><span class="message">${event.data}<span><div>`;
};
