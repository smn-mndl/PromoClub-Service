const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "PublishedData";

const pblshdData = {};

pblshdData.allPblshdDataLength = () => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  })
    .then((clnt) => {
      const collection = clnt.db().collection("Users");
      return collection
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
    })
    .catch((err) => {
      console.log("erroror", err);
    });
};

module.exports = pblshdData;
