const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/get-latest-photos/GetLatestPhotosBL");

router.get("/", (req, res, next) => {
  return busLog
    .latestPhotos()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
