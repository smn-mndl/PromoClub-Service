const db = require("./GetLatestPhotosDAL");
const busLog = {};

busLog.latestPhotos = () => {
  return db.latestPhotosDAL().then((item) => {
    return item;
  });
};

module.exports = busLog;
