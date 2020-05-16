const db = require("./UploadFileDAL");
const busLog = {};

busLog.uploadFile = (usrDtls, fileDtls) => {
  return db.UploadedFile(usrDtls, fileDtls).then(item => {
    if (item.insertedCount === 1) {
      return item;
    } else {
      return item;
    }
  });
};

module.exports = busLog;
