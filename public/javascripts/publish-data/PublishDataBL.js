const db = require("./PublishDataDAL");
const busLog = {};

busLog.publishDataBL = (reqBody, imageName, imageLocation) => {
  return db.publishDataDAL(reqBody, imageName, imageLocation).then((item) => {
    if (item.insertedCount === 1) {
      return item;
    } else {
      return item;
    }
  });
};

module.exports = busLog;
