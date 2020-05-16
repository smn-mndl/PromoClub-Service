var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const fs = require("fs");

var indexRouter = require("./routes/index");
var registerRouter = require("./routes/users");
var loginRouter = require("./routes/login");
const testRouter = require("./routes/testAPI");
const testPostRouter = require("./routes/testPost");
const uploadFileRouter = require("./routes/upload-file");
const publishDataRouter = require("./routes/publish-data");
const getAllPublishedDataRouter = require("./routes/get-all-publish-data");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/registerUsers", registerRouter);
app.use("/loginUser", loginRouter);
app.use("/testAPI", testRouter);
app.use("/testPost", testPostRouter);
app.use("/uploadFile", uploadFileRouter);
app.use("/publishData", publishDataRouter);
app.use("/getAllPublishedData", getAllPublishedDataRouter);

// create user

app.post("/api/createUser", function(req, res) {
  // var userEmail = req.body.user_email;

  var data = req.body;

  imageRef.push(data, function(err) {
    if (err) {
      res.send(err);
    } else {
      // var key = Object.keys(snapshot.val())[0];

      // console.log(key);

      res.json({ message: "Success: User Save.", result: true });
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log("error", req.body);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
