const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const token = crypto.randomBytes(20).toString("hex");
const nodemailer = require("nodemailer");

const busLog = require("../public/javascripts/forgot-password/BL");

router.post("/", (req, res, next) => {
  const email = req.body.email;
  console.log(req.body, "process.env.USERNAME");

  busLog
    .forgotPassword(req.body)
    .then((item) => {
      console.log("item", item);
      if (!item.result.isValid) {
        res.send({
          statusMsg:
            "Email is not present in database. Please try with a valid email id.",
          statusCode: "error",
        });
      } else {
        busLog.saveToken(req.body, token).then((item1) => {
          if (!item1.result.isValid) {
            res.send({
              statusMsg:
                "Error occured in generating password reset link. Please try again later.",
              statusCode: "warning",
            });
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
              },
            });

            const mailOptions = {
              from: "pixoque@resetpassword.com",
              to: email,
              subject: "Link to Reset Password",
              text:
                `You are receiving this because you ( or someone else ) have requested for password reset for your account. \n\n` +
                `Please click on the following link, or paste this into your browser to complete  the process within the one hour of receiving it: \n\n` +
                `${
                  req.headers.host.includes("localhost") ? "http" : "https"
                }://${req.headers.host.includes("localhost") ? "localhost:3000" :req.headers.host}/reset/${token} \n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error, "error happend");
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            res.send({
              statusMsg: "Password reset link is sent to your email.",
              statusCode: "success",
            });
          }
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
