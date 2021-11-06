const MongoClient = require("mongodb");
const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const collectionName = "Users";
const isEmpty = require("lodash/isEmpty");

const users = {};

users.RegisterUsers = (payload) => {
  console.log("process.env", process.env);
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct
        .find({ email: payload.email })
        .toArray()
        .then((data) => {
          if (data.length !== 1) {
            return connct.insertOne(payload).then((data) => {
              // MongoClient.close();
              return {
                result: {
                  successText: "Data saved successfully",
                  isValid: true,
                },
                status: "success",
              };
            });
          } else {
            // MongoClient.close();
            return {
              result: { successText: "Invalid email", isValid: false },
              status: "success",
            };
          }
        });
    } else {
      // MongoClient.close();
      return {
        result: { successText: "Invalid data", isValid: false },
        status: "success",
      };
    }
  });
};

users.LoginUser = (payload) => {
  console.log("process.env inside LoginUser");
  return MongoClient.connect(connURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 1,
  }).then((client) => {
    const connct2 = client.db().collection(collectionName);
    if (!isEmpty(payload)) {
      return connct2.findOne({ email: payload.email }).then((data) => {
        if (data && data.firstpassword === payload.password) {
          return data;
          // return {
          //   result: {
          //     successText: "Valid user",
          //     isValid: true,
          //     userDetails: {
          //       firstname: data.firstName,
          //       lastname: data.lastname,
          //       email: data.email,
          //       gender: data.gender,
          //     },
          //   },
          //   status: "success",
          // };
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

module.exports = users;
