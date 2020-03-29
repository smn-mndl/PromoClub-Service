const db = require("./DAL");
const busLog = {};

busLog.users = payload => {
  return db.RegisterUsers(payload).then(item => {
    if (item.insertedCount === 1) {
      return item;
    } else {
      return item;
    }
  });
};

busLog.loginUser = payload => {
  return db.LoginUser(payload).then(item => {
    console.log("in bl", item);
    // if (item.insertedCount === 1) {
    //   return item;
    // } else {
    return item;
    // }
  });
};

module.exports = busLog;
