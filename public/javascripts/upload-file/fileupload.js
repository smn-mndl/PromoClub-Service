const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: "AKIAJHJYXKAYLBDB5L5Q",
  secretAccessKey: "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",
  region: "ap-south-1",
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "yourclub",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA!" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
