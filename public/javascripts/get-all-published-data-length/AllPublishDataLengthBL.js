const db = require("./AllPublishDataLengthDAL");
const busLog = {};

busLog.getAllPublishedDataLength = () => {
  return db.allPblshdDataLength().then((item) => {
    return item;
  });
};

module.exports = busLog;
