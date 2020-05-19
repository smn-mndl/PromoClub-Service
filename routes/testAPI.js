const express = require("express");
const router = express.Router();
const upload = require("../public/javascripts/upload-file/fileupload");
const singleUpload = upload.single("image");

router.post("/image-up", (req, res) => {
  console.log("singleUp", singleUpload);
  singleUpload(req, res, function (err) {
    console.log("req.file", req.file);
    return res.json({ imageURL: req.file.location });
  });
});

module.exports = router;
