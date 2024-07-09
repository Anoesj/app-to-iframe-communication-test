export function getTimestamp () {
  const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();

  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function getMessageEventMarkup (message) {
  return `<div class="message-event"><span class="timestamp">${getTimestamp()}</span><span class="message">${message}<span><div>`;
}