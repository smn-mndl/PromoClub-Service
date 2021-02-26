const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "LatestPhotos";
const isEmpty = require("lodash/isEmpty");

const latestPhotos = {};

latestPhotos.latestPhotosDAL = () => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct = client.db().collection(collectionName);
    return connct
      .find()
      .toArray()
      .then((data) => {
        if (data.length !== 1) {
          return {
            result: {
              latestPhotos: data,
            },
            status: "success",
          };
        } else {
          return {
            result: { latestPhotos: [] },
            status: "success",
          };
        }
      });
  });
};

module.exports = latestPhotos;
