const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI3 || "mongodb://127.0.0.1:27017/PromoClub";
const connURL2 =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";
const collectionName = "AllPhotosCollection";
const isEmpty = require("lodash/isEmpty");

const photoDetails = {};

photoDetails.photoDetailsDAL = (payload) => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct = client.db().collection(collectionName);
    return connct
      .find({ _id: payload.id })
      .toArray()
      .then((data) => {
        console.log(data, "data ");
        if (data.length === 1) {
          return MongoClient.connect(connURL2, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: 1,
          }).then((client2) => {
            const connct1 = client2.db().collection(data[0]["albumName"]);
            return connct1
              .find({ _id: payload.id })
              .toArray()
              .then((data) => {
                if (data.length === 1) {
                  return {
                    result: data,
                    status: "success",
                  };
                } else {
                  return {
                    result: [],
                    status: "success",
                  };
                }
              });
          });
        } else {
          return {
            result: [],
            status: "success",
          };
        }
      });
  });
};

module.exports = photoDetails;
