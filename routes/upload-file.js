const express = require("express");
const router = express.Router();
// const busLog = require("../public/javascripts/upload-file/UploadFileBL");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("file"), (req, res, next) => {
//   return busLog
//     .uploadFile(req.body, req.file)
//     .then(item => {
//       res.send(item);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

module.exports = router;
