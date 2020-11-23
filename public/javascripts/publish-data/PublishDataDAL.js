const MongoClient = require("mongodb");

const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const publishedDataColl = "PublishedData";
const userDtlsColltn = "Users";
const isEmpty = require("lodash/isEmpty");

const publishes = {};

publishes.publishDataDAL = (reqBody, imageName, imageLocation) => {
  const { email, title, desc, link } = reqBody;
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct1 = client.db().collection(userDtlsColltn);
    if (!isEmpty(email)) {
      return connct1
        .find({ email })
        .toArray()
        .then((data) => {
          if (data.length === 1) {
            return MongoClient.connect(connURL).then((client2) => {
              const connct2 = client2.db().collection(publishedDataColl);

              //TODO::
              //Make a connection to amazon web services
              const payload = {
                email,
                title,
                desc,
                link,
                profileImageLoc: imageLocation,
                profileImageName: imageName,
              };
              return connct2.insertOne(payload).then((data) => {
                // MongoClient.close();
                return {
                  result: {
                    successText: "Data saved successfully",
                  },
                  status: "success",
                };
              });
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

module.exports = publishes;
