const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/BL");

router.post("/", (req, res, next) => {
  return busLog
    .users(req.body)
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
