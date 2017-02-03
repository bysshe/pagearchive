exports.createModel = function (req) {
  let model = {
    title: "Page Archive: save and share anything on the web",
    showMyShots: !!req.deviceId
  };
  return model;
};
