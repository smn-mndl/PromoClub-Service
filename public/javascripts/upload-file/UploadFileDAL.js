const MongoClient = require("mongodb");

const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";
const connURL2 = "mongodb://127.0.0.1:27017/PromoClub";

const fileUpldCollctn = "UploadedFile";
const publishedDataColl = "PublishedData";
const userDtlsColltn = "Users";
const isEmpty = require("lodash/isEmpty");

const files = {};

files.UploadedFile = (usrDtls, fileDtls) => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct1 = client.db().collection(userDtlsColltn);
    if (!isEmpty(usrDtls)) {
      return connct1
        .find({ email: usrDtls.email })
        .toArray()
        .then((data) => {
          if (data.length === 1) {
            return MongoClient.connect(connURL).then((client2) => {
              //TODO::
              //Make a connection to amazon web services
            });
          } else {
            // MongoClient.close();
            return {
              result: { errorText: "Invalid email", isValid: false },
              status: "success",
            };
          }
        });
    } else {
      // MongoClient.close();
      return { result: "Not Valid Data" };
    }
  });
};

module.exports = files;
