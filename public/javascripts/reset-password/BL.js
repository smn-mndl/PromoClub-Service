const db = require("./DAL");
const busLog = {};

busLog.resetPassword = payload => {
  return db.ResetPassword(payload).then(item => {
    return item;
  });
};

module.exports = busLog;
