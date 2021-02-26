const { GraphQLObjectType, GraphQLString } = require("graphql");
const busLog = require("../../../javascripts/BL");

const LoginType = new GraphQLObjectType({
  name: "LoginType",
  fields: () => ({
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastname: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});
const LoginQuery = new GraphQLObjectType({
  name: "UserLogin",
  fields: {
    UserLogin: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return busLog.loginUser(args);
      },
    },
  },
});

module.exports = LoginQuery;
