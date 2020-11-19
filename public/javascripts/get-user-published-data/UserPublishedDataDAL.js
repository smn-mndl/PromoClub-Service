const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "UserPublishedData";
const isEmpty = require("lodash/isEmpty");

const pblshdData = {};

pblshdData.userPblshdData = () => {
  return MongoClient.connect(connURL).then((client) => {
    const connct = client.db().collection(collectionName);
    return connct
      .find()
      .toArray()
      .then((data) => {
        if (data.length !== 1) {
          return {
            result: {
              publishedData: data,
            },
            status: "success",
          };
        } else {
          return {
            result: { publishedData: [] },
            status: "success",
          };
        }
      });
  });
};

module.exports = pblshdData;
