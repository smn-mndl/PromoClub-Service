const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/get-photo-details/GetPhotoDetailsBL");

router.post("/", (req, res, next) => {
  console.log("reqqq", req.body);
  return busLog
    .photoDetailsBL(req.body)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
