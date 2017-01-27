/* globals addIds, makeStaticHtml, extractorWorker, chrome, AbstractShot */
/* globals XMLHttpRequest, window, location, alert, console, urlDomainForId, randomString */
/* globals document, setTimeout, location */
/* exported chromeShooter */

const chromeShooter = (function () { // eslint-disable-line no-unused-vars
  let exports = {};

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let registrationInfo;
  let shot;

  let completeResolver;
  let collectionComplete = new Promise((resolve, reject) => {
    completeResolver = resolve;
  });

  exports.init = function () {
    let promises = [];
    addIds.setIds();
    promises.push(makeStaticHtml.documentStaticData().then((result) => {
      console.log("got attrs from static:", result);
      shot.update(result);
    }));
    let attrs = extractorWorker.extractData();
    // FIXME: check if page is private:
    delete attrs.passwordFields;
    shot.update(attrs);
    shot.showPage = true;
    let promise = Promise.all(promises);
    return promise;
  };

  exports.deactivate = function () {
  };

  exports.takeShot = function () {
    collectionComplete.then(() => {
      return true;
    }).then(() => {
      console.log({
        type: "notifyAndCopy",
        url: shot.viewUrl
      });
      chrome.runtime.sendMessage({
        type: "notifyAndCopy",
        url: shot.viewUrl
      });
      console.log("sending to", shot.jsonUrl);
      let data = shot.asJson();
      let req = new Request(shot.jsonUrl, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(data),
        mode: "cors"
      });
      chrome.runtime.sendMessage({
        type: "upload",
        url: shot.jsonUrl,
        data: shot.asJson()
      }, (result) => {
        if (result.succeeded) {
          chrome.runtime.sendMessage({
            type: "openTab",
            url: shot.viewUrl
          });
          exports.deactivate();
        } else {
          alert(`Error creating shot at ${JSON.stringify(shot.jsonUrl)}: ${result.error}`);
        }
      });
      false && fetch(req).then((resp) => {
        if (! resp.ok) {
          alert("Error saving shot: " + resp.status + " " + resp.responseText);
          return;
        }
        exports.sendEvent("new-tab-after-save");
        console.log("sending openTab", {
          type: "openTab",
          url: shot.viewUrl
        });
        console.log("done");
      }).catch((e) => {
      });
      console.log("done and sent", JSON.stringify(data).length);
    });
  };

  /** Happens when the URL changes via window.history */
  exports.popstate = function () {
    exports.deactivate();
  };

  function makeShot() {
    shot = new AbstractShot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(location),
      {
        url: location.href,
        deviceId: registrationInfo.deviceId
      }
    );
    console.log("Created shot:", shot.viewUrl);
    exports.init().then(() => {
      completeResolver();
    });
  }

  chrome.runtime.sendMessage({type: "requestConfiguration"}, (response) => {
    backend = response.backend;
    exports.hasUsedMyShots = response.hasUsedMyShots;
    registrationInfo = {
      deviceId: response.deviceId,
      deviceInfo: response.deviceInfo,
      secret: response.secret
    };
    makeShot();
  });

  exports.sendEvent = function (action, label) {
    console.log({
      type: "sendEvent",
      action,
      label
    });
    chrome.runtime.sendMessage({
      type: "sendEvent",
      action,
      label
    });
  };

  return exports;
})();

// Launch immediately:

chromeShooter.takeShot();
