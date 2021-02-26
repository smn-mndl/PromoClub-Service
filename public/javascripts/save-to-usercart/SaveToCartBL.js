const db = require("./SaveToCartDAL");
const busLog = {};

busLog.saveToCartBL = (reqBody, imageName, imageLocation) => {
  return db.saveToCartDAL(reqBody, imageName, imageLocation).then((item) => {
    // if (item.insertedCount === 1) {
    return item;
    // } else {
    //   return item;
    // }
  });
};

module.exports = busLog;
