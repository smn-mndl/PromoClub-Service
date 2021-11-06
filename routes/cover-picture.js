const express = require("express");
const router = express.Router();
// const busLog = require("../public/javascripts/publish-data/PublishDataBL");
// const multer = require("multer");
// const upload = multer({});
// const profileImgUpload = require("../public/javascripts/upload-file/fileupload");

// router.post("/", (req, res, next) => {
//   let imageName = "",
//     imageLocation = "",
//     reqBody = {};
//   profileImgUpload(req, res, (error) => {
//     reqBody = req.body ? req.body : {};
//     if (error) {
//       console.log("errors", error);
//       res.json({ error: error });
//     } else {
//       // If File not found
//       if (req.file === undefined) {
//         console.log("Error: No File Selected!");
//         res.json("Error: No File Selected");
//       } else {
//         // If Success
//         imageName = req.file.key;
//         imageLocation = req.file.location;
//         // Save the file name into database into profile model
//         // res.json({
//         //   image: imageName,
//         //   location: imageLocation,
//         // });
//         return busLog
//           .publishDataBL(reqBody, imageName, imageLocation)
//           .then((item) => {
//             res.send(item);
//           })
//           .catch((err) => {
//             next(err);
//           });
//       }
//     }
//   });
// });

module.exports = router;
