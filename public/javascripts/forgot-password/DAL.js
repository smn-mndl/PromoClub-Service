const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "Users";
const isEmpty = require("lodash/isEmpty");

const users = {};

users.ForgotPassword = (payload) => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct2 = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct2.findOne({ email: payload.email }).then((data) => {
        console.log("dataa", data);
        if (data && data.email) {
          return {
            result: {
              successText: "Valid user",
              isValid: true,
            },
            status: "success",
          };
        } else {
          return {
            result: { errorText: "Invalid user", isValid: false },
            status: "fail",
          };
        }
      });
    } else {
      return { result: "Not Valid Data" };
    }
  });
};

users.SaveToken = (payload, token) => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct2 = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct2
        .updateOne(
          { email: payload.email },
          {
            $set: {
              resetPasswordToken: token,
              resetPasswordExpires: Date.now() + 3600000,
            },
          }
        )
        .then((data) => {
          
          if (data) {
            return {
              result: {
                successText: "Updated",
                isValid: true,
              },
              status: "success",
            };
          } else {
            return {
              result: { errorText: "Not able to update", isValid: false },
              status: "fail",
            };
          }
        });
    } else {
      return { result: "Not Valid Data" };
    }
  });
};

module.exports = users;
