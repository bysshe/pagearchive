/* globals document, alert, setInterval, clearTimeout */
/* exports sendEvent */

function sendEvent(type, detail) {
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent(type, true, true, detail);
  document.dispatchEvent(event);
}

document.addEventListener("delete-everything", (event) => {
  // FIXME: implement
  alert("Not yet implemented");
}, false);

let readyTimeout = setInterval(function () {
  var readyEvent = document.createEvent("CustomEvent");
  readyEvent.initCustomEvent("helper-ready", true, true, null);
  document.dispatchEvent(readyEvent);
}, 200);

document.addEventListener("page-ready", function () {
  clearTimeout(readyTimeout);
}, false);
