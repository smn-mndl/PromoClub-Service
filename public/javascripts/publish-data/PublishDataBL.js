const db = require("./UploadFileDAL");
const busLog = {};

busLog.getAllPublishedData = (usrDtls, fileDtls) => {
  return db.allPblshdData(usrDtls, fileDtls).then(item => {
    if (item.insertedCount === 1) {
      return item;
    } else {
      return item;
    }
  });
};

module.exports = busLog;
