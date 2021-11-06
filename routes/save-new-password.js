const express = require("express");
const router = express.Router();
const busLog = require("../public/javascripts/save-new-pass/BL");

router.post("/", (req, res, next) => {
  return busLog
    .saveNewPass(req.body)
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
