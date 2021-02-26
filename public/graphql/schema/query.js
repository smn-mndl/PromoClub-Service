// const {
//   buildSchema,
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLSchema,
// } = require("graphql");

// const Query = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     hello: {
//       type: GraphQLString,
//       resolve: () => "world",
//     },
//     users: {
//       type: new GraphQLList(userType),
//       args: {
//         name: {
//           name: "name",
//           type: GraphQLString,
//         },
//       },
//       resolve: resolveUsers,
//     },
//   },
// });

// export default Query;
