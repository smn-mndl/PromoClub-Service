const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/get-all-published-data-length/AllPublishDataLengthBL");

router.get("/", (req, res, next) => {
  return busLog
    .getAllPublishedDataLength()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
