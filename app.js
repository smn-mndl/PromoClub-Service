var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
var { graphqlHTTP } = require("express-graphql");
var {
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
} = require("graphql");

// Construct a schema, using GraphQL schema language
// var schema = new GraphQLSchema({
//   query: LoginQuery,
// });

var indexRouter = require("./routes/index");
var registerRouter = require("./routes/users");
var loginRouter = require("./routes/login");
// const testRouter = require("./routes/testAPI");
const testPostRouter = require("./routes/testPost");
// const uploadFileRouter = require("./routes/upload-file");
// const publishDataRouter = require("./routes/publish-data");
const getAllPublishedDataRouter = require("./routes/get-all-publish-data");
const getPublishedDataLengthRouter = require("./routes/get-all-publish-data-length");
const coverPictureRouter = require("./routes/cover-picture");
const getUserPublishedData = require("./routes/get-user-published-data");
const latestPhotosRouter = require("./routes/get-latest-photos");
const photoDetailsRouter = require("./routes/get-photo-details");
const LoginSchema = require("./public/graphql/schema/login/login-schema");
const saveToCartRouter = require("./routes/save-to-cart");
const passwordRecoveryRouter = require("./routes/forgot-password");
const resetPasswordRouter = require("./routes/reset-password");
const saveNewPasswordRouter = require("./routes/save-new-password");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/registerUsers", registerRouter);
// app.use("/loginUser", loginRouter);
// app.use("/testAPI", testRouter);
app.use("/testPost", testPostRouter);
// app.use("/uploadFile", uploadFileRouter);
// app.use("/publishData", publishDataRouter);
app.use("/getAllPublishedData", getAllPublishedDataRouter);
// app.use("/image-upload", testRouter);
app.use("/getPublishedDataLength", getPublishedDataLengthRouter);
app.use("/coverPicture", coverPictureRouter);
app.use("/latestPhotos", latestPhotosRouter);
app.use("/getPhotoDetails", photoDetailsRouter);
app.use("/saveToCart", saveToCartRouter);
app.use("/forgotPassword", passwordRecoveryRouter);
app.use("/resetPassword", resetPasswordRouter);
app.use("/saveNewPassword", saveNewPasswordRouter);
app.use(
  "/loginUser",
  graphqlHTTP({
    schema: LoginSchema,
    graphiql: true,
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("error", req.body);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
