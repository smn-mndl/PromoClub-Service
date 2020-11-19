const db = require("./UserPublishedDataDAL");
const busLog = {};

busLog.getUserPublishedData = () => {
  return db.userPblshdData().then((item) => {
    return item;
  });
};

module.exports = busLog;
