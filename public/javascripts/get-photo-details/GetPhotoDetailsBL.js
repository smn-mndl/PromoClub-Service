const db = require("./GetPhotoDetailsDAL");
const busLog = {};

busLog.photoDetailsBL = (reqBody) => {
  console.log("reqBody", reqBody);
  return db.photoDetailsDAL(reqBody).then((item) => {
    return item;
  });
};

module.exports = busLog;
