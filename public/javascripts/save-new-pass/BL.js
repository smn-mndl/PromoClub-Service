const db = require("./DAL");
const busLog = {};

busLog.saveNewPass = (payload) => {
  return db.saveNewPassDAL(payload).then((item) => {
    if (item) {
      return item;
    } else {
      return {
        result: {
          successText: "Failed to connect to database",
          isValid: false,
        },
        status: "success",
      };
    }
  });
};

module.exports = busLog;
