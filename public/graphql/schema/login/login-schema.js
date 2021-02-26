const { GraphQLSchema } = require("graphql");
const LoginQuery = require("./query");
console.log("loginquery", LoginQuery);
const LoginSchema = new GraphQLSchema({
  query: LoginQuery,
});

module.exports = LoginSchema;
