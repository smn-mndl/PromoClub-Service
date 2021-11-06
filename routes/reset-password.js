const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/reset-password/BL");

router.get("/", (req, res, next) => {
  console.log("req.params", req.query);
  return busLog
    .resetPassword(req.query)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
