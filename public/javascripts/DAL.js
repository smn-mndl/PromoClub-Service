const MongoClient = require("mongodb");
// const connURL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
// "mongodb://<dbuser>:<dbpassword>@ds013848.mlab.com:13848/heroku_6bfvmk84"
const connURL =
  "mongodb://heroku_6bfvmk84:mrhm6umoe37ccoitr88tlckvj8@ds013848.mlab.com:13848/heroku_6bfvmk84" ||
  "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "Users";
const isEmpty = require("lodash/isEmpty");

const users = {};

users.RegisterUsers = payload => {
  return MongoClient.connect(connURL).then(client => {
    const connct = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct
        .find({ email: payload.email })
        .toArray()
        .then(data => {
          if (data.length !== 1) {
            return connct.insertOne(payload).then(data => {
              // MongoClient.close();
              return {
                result: {
                  successText: "Data saved successfully",
                  isValid: true
                },
                status: "success"
              };
            });
          } else {
            // MongoClient.close();
            return {
              result: { errorText: "Invalid email", isValid: false },
              status: "success"
            };
          }
        });
    } else {
      // MongoClient.close();
      return { result: "Not Valid Data" };
    }
  });
};

users.LoginUser = payload => {
  console.log("payload in login", payload.email);
  return MongoClient.connect(connURL, { useUnifiedTopology: true }).then(
    client => {
      const connct2 = client.db().collection(collectionName);
      if (!isEmpty(payload)) {
        console.log("the2323n");
        return connct2.findOne({ email: payload.email }).then(data => {
          console.log("then", data);
          if (data.firstpassword === payload.password) {
            return {
              result: {
                successText: "Valid user",
                isValid: true,
                userDetails: {
                  firstname: data.firstName,
                  lastname: data.lastname,
                  email: data.email,
                  gender: data.gender
                }
              },
              status: "success"
            };
          } else {
            return {
              result: { errorText: "Invalid user", isValid: false },
              status: "fail"
            };
          }
        });
      } else {
        return { result: "Not Valid Data" };
      }
    }
  );
};

module.exports = users;
