const MongoClient = require("mongodb");

const connURL =
  process.env.MONGODB_URI2 || "mongodb://127.0.0.1:27017/PromoClub";

const userDtlsColltn = "Users";
const isEmpty = require("lodash/isEmpty");

const cart = {};

cart.saveToCartDAL = (payload) => {
  const { email, updatedCart } = payload;
  console.log(payload);
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
            connct1
              .update(
                { email },
                {
                  $set: { cart: updatedCart },
                }
              )
              .then((res) => {
                return res;
              });
          }
        });
    }
  });
};

module.exports = cart;
