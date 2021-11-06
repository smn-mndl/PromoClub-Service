const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "Users";
const isEmpty = require("lodash/isEmpty");

const users = {};

users.ResetPassword = (payload) => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct2 = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct2
        .findOne({
          resetPasswordToken: payload.token,
          resetPasswordExpires: { $gt: Date.now() },
        })
        .then((data) => {
          if (data && data.email) {
            return {
              result: {
                successText: "Password reset link is ok.",
                isValid: true,
                email: data.email
              },
              status: "success",
            };
          } else {
            return {
              result: { errorText: "Password reset link is invalid or has expired.", isValid: false },
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
