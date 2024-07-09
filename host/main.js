import '../src/style.css'
import { getMessageEventMarkup } from '../src/utils';

const iframe = document.querySelector('iframe');
const form = document.querySelector('form');
const input = document.getElementById('input');
const output = document.getElementById('output');

const targetOrigin = '*'; // https://iframe-url.com

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = input.value.trim();

  if (!message) {
    return;
  }

  iframe.contentWindow.postMessage(JSON.stringify({
    event: 'text-message',
    data: message,
  }), targetOrigin);

  input.value = '';
}, { passive: false });

window.addEventListener('message', (event) => {
  // Only allow events from specific origins:
  // if (!allowedOrigins.includes(event.origin)) return;

  let messageEvent;
  try {
    messageEvent = JSON.parse(event.data);
  }
  catch (err) {
    console.error(`[host] Error parsing event data:`, err);
    return;
  }

  console.log(`[host] Incoming event:`, event);

  switch (messageEvent.event) {
    case 'text-message':
      output.innerHTML += getMessageEventMarkup(messageEvent.data);
      break;
  }
});
