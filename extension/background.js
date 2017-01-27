/* globals chrome, console, XMLHttpRequest, Image, document, setTimeout, makeUuid, navigator */
let manifest = chrome.runtime.getManifest();
let backend;
for (let permission of manifest.permissions) {
  if (permission.search(/^https?:\/\//i) != -1) {
    backend = permission;
    break;
  }
}
backend = backend.replace(/\/*$/, "");
let registrationInfo;
let setCookie;
let initialized = false; // eslint-disable-line no-unused-vars

let platformInfo;
chrome.runtime.getPlatformInfo(function(info) {
  platformInfo = info;
});

chrome.runtime.onInstalled.addListener(function () {
});

chrome.browserAction.onClicked.addListener(function(tab) {
  sendEvent("click-shot-button");
  let scripts = [
    "error-utils.js",
    "uuid.js",
    "shot.js",
    "randomstring.js",
    "url-domain.js",
    "add-ids.js",
    "make-static-html.js",
    "extractor-worker.js",
    //"annotate-position.js",
    //"selector-util.js",
    //"selector-ui.js",
    //"selector-snapping.js",
    //"shooter-interactive-worker.js",
    "chrome-shooter.js"
  ];
  let lastPromise = Promise.resolve(null);
  scripts.forEach((script) => {
    lastPromise = lastPromise.then(() => {
      return chrome.tabs.executeScript({
        file: script
      });
    });
  });
  lastPromise.then(() => {
    console.log("finished loading scripts:", scripts, chrome.runtime.lastError);
  }).catch((err) => {
    console.error("Error loading scripts:", err);
  });
});

chrome.storage.sync.get(["backend", "registrationInfo"], (result) => {
  if (result && result.backend) {
    backend = result.backend;
  }
  if (result && result.registrationInfo) {
    registrationInfo = result.registrationInfo;
    login();
  } else {
    registrationInfo = generateRegistrationInfo();
    chrome.storage.sync.set({
      registrationInfo: registrationInfo
    }, () => {
      console.info("Device authentication saved");
    });
    console.info("Generating new device authentication ID", registrationInfo);
    register();
  }
});

function generateRegistrationInfo() {
  let info = {
    deviceId: "anon" + makeUuid() + "",
    secret: makeUuid()+"",
    // FIXME-chrome: need to figure out the reason the extension was created
    // (i.e., startup or install)
    //reason,
    deviceInfo: JSON.stringify(deviceInfo())
  };
  return info;
}

function deviceInfo() {
  let match = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9\.]+)/);
  let chromeVersion = match ? match[1] : null;

  return {
    addonVersion: manifest.version,
    platform: platformInfo.os,
    architecture: platformInfo.arch,
    version: chromeVersion,
    // These don't seem to apply to Chrome:
    //build: system.build,
    //platformVersion: system.platformVersion,
    userAgent: navigator.userAgent,
    appVendor: "chrome",
    appName: "chrome"
  };
}

function login() {
  return new Promise((resolve, reject) => {
    let loginUrl = backend + "/api/login";
    let req = new XMLHttpRequest();
    req.open("POST", loginUrl);
    req.onload = () => {
      if (req.status == 404) {
        // No such user
        resolve(register());
      } else if (req.status >= 300) {
        console.warn("Error in response:", req.responseText);
        reject(new Error("Could not log in: " + req.status));
      } else if (req.status === 0) {
        let error = new Error("Could not log in, server unavailable");
        sendEvent("login-failed", {ni: true});
        reject(error);
      } else {
        initialized = true;
        let result = JSON.parse(req.responseText);
        setCookie = result["x-set-cookie"];
        console.info("Page Shot logged in");
        sendEvent("login", {ni: true});
        resolve();
      }
    };
    req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    req.send(uriEncode({
      deviceId: registrationInfo.deviceId,
      secret: registrationInfo.secret,
      // FIXME: give proper reason
      reason: "install",
      deviceInfo: JSON.stringify(deviceInfo())
    }));
  });
}

function register() {
  return new Promise((resolve, reject) => {
    let registerUrl = backend + "/api/register";
    let req = new XMLHttpRequest();
    req.open("POST", registerUrl);
    req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    req.onload = () => {
      if (req.status == 200) {
        console.info("Registered login");
        initialized = true;
        let result = JSON.parse(req.responseText);
        setCookie = result["x-set-cookie"];
        resolve();
        sendEvent("registered", {ni: true});
      } else {
        console.warn("Error in response:", req.responseText);
        reject(new Error("Bad response: " + req.status));
      }
    };
    req.send(uriEncode(registrationInfo));
  });
}

function uriEncode(obj) {
  let s = [];
  for (let key in obj) {
    s.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }
  return s.join("&");
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.info(`onMessage request: ${JSON.stringify(req)}`);
  if (req.type == "requestConfiguration") {
    console.log("result:", {
      backend,
      deviceId: registrationInfo.deviceId,
      deviceInfo: registrationInfo.deviceInfo,
      secret: registrationInfo.secret
    });
    sendResponse({
      backend,
      deviceId: registrationInfo.deviceId,
      deviceInfo: registrationInfo.deviceInfo,
      secret: registrationInfo.secret
    });
    console.log("done");
  } else if (req.type == "notifyAndCopy") {
    clipboardCopy(req.url);
    let id = makeUuid();
    chrome.notifications.create(id, {
      type: "basic",
      iconUrl: "img/clipboard-32.png",
      title: "Link Copied",
      message: "The link to your shot has been copied to the clipboard"
    });
    sendResponse(null);
  } else if (req.type == "sendEvent") {
    sendEvent(req.action, req.label);
    sendResponse(null);
  } else if (req.type == "openTab") {
    chrome.tabs.create({url: req.url});
    sendResponse(null);
  } else if (req.type == "upload") {
    putShot(req.url, req.data).then(() => {
      sendResponse({succeeded: true});
    }).catch((e) => {
      sendResponse({succeeded: false, error: ""+e});
    });
    return true;
  } else {
    console.error("Message not understood:", req);
  }
  return null;
});

function screenshotPage(pos, scroll) {
  pos = {
    top: pos.top - scroll.scrollY,
    left: pos.left - scroll.scrollX,
    bottom: pos.bottom - scroll.scrollY,
    right: pos.right - scroll.scrollX
  };
  pos.width = pos.right - pos.left;
  pos.height = pos.bottom - pos.top;
  return new Promise((resolve, reject) => {
    return chrome.tabs.captureVisibleTab(
      null,
      {format: "png"},
      function (dataUrl) {
        let image = new Image();
        image.src = dataUrl;
        image.onload = () => {
          let xScale = image.width / scroll.innerWidth;
          let yScale = image.height / scroll.innerHeight;
          let canvas = document.createElement("canvas");
          canvas.height = pos.height * yScale;
          canvas.width = pos.width * xScale;
          let context = canvas.getContext("2d");
          context.drawImage(
            image,
            pos.left * xScale, pos.top * yScale,
            pos.width * xScale, pos.height * yScale,
            0, 0,
            pos.width * xScale, pos.height * yScale
          );
          let result = canvas.toDataURL();
          resolve(result);
        };
      }
    );
  });
}

function clipboardCopy(text) {
  let el = document.createElement("textarea");
  document.body.appendChild(el);
  el.value = text;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

function sendEvent(action, label) {
  let eventName = "addon";
  let url = backend + "/event";
  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/json");
  req.setRequestHeader("x-set-cookie", setCookie);
  req.onload = () => {
    if (req.status >= 300) {
      console.warn("Event gave non-2xx response:", req.status);
    }
  };
  req.send(JSON.stringify({
    event: eventName,
    action,
    label
  }));
}

function putShot(url, data) {
  let req = new Request(url, {
    method: "PUT",
    mode: "cors",
    headers: {"content-type": "application/json", "x-set-cookie": setCookie},
    body: JSON.stringify(data)
  });
  return fetch(req).then((resp) => {
    if (! resp.ok) {
      throw new Error("Error: response failed");
    }
    return true;
  });
}
