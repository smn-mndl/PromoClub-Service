const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/save-to-usercart/SaveToCartBL");

router.post("/", (req, res, next) => {
  return busLog
    .saveToCartBL(req.body)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
