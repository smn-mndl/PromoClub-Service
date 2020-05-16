const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/get-all-published-data/AllPublishDataBL");

router.get("/", (req, res, next) => {
  return busLog
    .getAllPublishedData()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
