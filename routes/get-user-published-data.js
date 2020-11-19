const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/get-user-published-data/UserPublishedDataBL");

router.get("/", (req, res, next) => {
  return busLog
    .getUserPublishedData()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
