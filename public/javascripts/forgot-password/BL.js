const db = require("./DAL");
const busLog = {};

busLog.forgotPassword = (payload) => {
  return db.ForgotPassword(payload).then((item) => {
    return item;
  });
};
busLog.saveToken = (payload, token) => {
  return db.SaveToken(payload, token).then((item) => {
    return item;
  });
};
module.exports = busLog;
