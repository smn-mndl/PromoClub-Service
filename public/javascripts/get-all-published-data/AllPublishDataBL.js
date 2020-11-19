const db = require("./AllPublishDataDAL");
const busLog = {};

busLog.getAllPublishedData = () => {
  return db.allPblshdData().then((item) => {
    return item;
  });
};

module.exports = busLog;
