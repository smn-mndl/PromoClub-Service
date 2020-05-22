const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "PublishedData";

const pblshdData = {};

pblshdData.allPblshdDataLength = () => {
  return MongoClient.connect(connURL).then((client) => {
    const connct = client.db().collection(collectionName);
    return connct
      .find()
      .toArray()
      .then((data) => {
        return {
          result: {
            publishedDataCount: data.length,
          },
          status: "success",
        };
      });
  });
};

module.exports = pblshdData;
