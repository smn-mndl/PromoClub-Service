const MongoClient = require("mongodb");
var admin = require("firebase-admin");
const googleStorage = require("@google-cloud/storage");
const { Storage } = require("@google-cloud/storage");
var AWS = require("aws-sdk");
const fs = require("fs");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const storage = new Storage({
  projectId: "promoclub-ind",
  keyFilename: serviceAccount,
});

// Create an S3 client
const s3 = new AWS.S3({
  accessKeyId: "AKIAJHJYXKAYLBDB5L5Q",
  secretAccessKey: "GWJ51lhqIfkVsCI0Mp1VjgH1pKMHXzmiQ7CIascT",
});

var bucketName1 = "yourclub";

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "promoclub-ind.appspot.com",
});

const connURL =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PromoClub";
const connURL2 = "mongodb://127.0.0.1:27017/PromoClub";

const fileUpldCollctn = "UploadedFile";
const publishedDataColl = "PublishedData";
const userDtlsColltn = "Users";
const isEmpty = require("lodash/isEmpty");

const files = {};

files.UploadedFile = (usrDtls, fileDtls) => {
  return MongoClient.connect(connURL).then((client) => {
    const connct1 = client.db().collection(userDtlsColltn);
    if (!isEmpty(usrDtls)) {
      return connct1
        .find({ email: usrDtls.email })
        .toArray()
        .then((data) => {
          if (data.length === 1) {
            return MongoClient.connect(connURL).then((client2) => {
              // const connect2 = client2.db().collection(publishedDataColl);

              // Setting up S3 upload parameters
              const params = {
                Bucket: bucketName1,
              };

              s3.createBucket(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log("Bucket Created Successfully", data.Location);
              });

              // // Read content from the file
              // const fileContent = fs.readFileSync("./DSC_3720_New.jpg");
              // console.log("fileContent", fileContent);

              // // Uploading files to the bucket
              // s3.upload(params, function (err, data) {
              //   if (err) {
              //     throw err;
              //   }
              //   console.log(`File uploaded successfully. ${data.Location}`);
              // });
            });
          } else {
            // MongoClient.close();
            return {
              result: { errorText: "Invalid email", isValid: false },
              status: "success",
            };
          }
        });
    } else {
      // MongoClient.close();
      return { result: "Not Valid Data" };
    }
  });
};

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);
  console.log("fileContent", fileContent);
  // Setting up S3 upload parameters
  const params = {
    Bucket: bucketName1,
    Key: "cat.jpg", // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = files;
