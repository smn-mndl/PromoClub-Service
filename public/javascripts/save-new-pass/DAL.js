const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "Users";
const isEmpty = require("lodash/isEmpty");

const users = {};

users.saveNewPassDAL = (payload) => {
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct2 = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct2
        .find({
          resetPasswordToken: payload.token.token,
          resetPasswordExpires: { $gt: Date.now() },
        })
        .toArray()
        .then((data) => {
          if (data && data.length === 1) {
            return connct2
              .updateOne(
                { email: data[0].email },
                {
                  $set: {
                    firstpassword: payload.newPass.newPass,
                    confirmpassword: payload.newPass.confirmPass,
                    resetPasswordToken: "",
                    resetPasswordExpires: "",
                  },
                }
              )
              .then((data1) => {
                if (data1.result.n === 1 || data1) {
                  return {
                    result: {
                      successText: "Updated",
                      isValid: true,
                    },
                    status: "success",
                  };
                } else {
                  return {
                    result: { errorText: "Unable to update", isValid: false },
                    status: "fail",
                  };
                }
              });
          }
        });
    } else {
      return { result: "Invalid Data" };
    }
  });
};

module.exports = users;
