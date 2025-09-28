// Polyfill for process in browser
if (typeof global === 'undefined') {
  var global = window;
}
if (typeof process === 'undefined') {
  window.process = { env: {} };
}
