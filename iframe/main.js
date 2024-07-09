import '../src/style.css'
import { getMessageEventMarkup } from '../src/utils';

const form = document.querySelector('form');
const input = document.getElementById('input');
const output = document.getElementById('output');

const targetOrigin = '*'; // https://host-url.com

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = input.value.trim();

  if (!message) {
    return;
  }

  if (window.top === window.self) {
    alert('Will not send message. We only send messages if we are embedded in an iframe.')
  }
  else {
    window.top.postMessage(JSON.stringify({
      event: 'text-message',
      data: message,
    }), targetOrigin);
  }

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
    console.error(`[iframe] Error parsing event data:`, err);
    return;
  }

  console.log(`[iframe] Incoming event:`, messageEvent);

  switch (messageEvent.event) {
    case 'text-message':
      output.innerHTML += getMessageEventMarkup(messageEvent.data);
      break;
  }
});
