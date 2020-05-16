const MongoClient = require("mongodb");
var admin = require("firebase-admin");
const googleStorage = require("@google-cloud/storage");
const { Storage } = require("@google-cloud/storage");

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const storage = new Storage({
  projectId: "promoclub-ind",
  keyFilename: serviceAccount
});

var serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "promoclub-ind.appspot.com"
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
  // console.log("payload", fileDtls);
  return MongoClient.connect(connURL).then(client => {
    const connct1 = client.db().collection(userDtlsColltn);
    if (!isEmpty(usrDtls)) {
      return connct1
        .find({ email: usrDtls.email })
        .toArray()
        .then(data => {
          if (data.length !== 1) {
            return MongoClient.connect(connURL).then(client2 => {
              const connect2 = client2.db().collection(publishedDataColl);

              /**
               * TODO(developer): Uncomment the following lines before running the sample.
               */
              const bucketName = "promoclub-ind.appspot.com";
              const filename = process.env.DIR;
              console.log("filename", filename);
              // Creates a client
              const storage = new Storage();

              async function getMetadata() {
                // Gets the metadata for the file
                const [metadata] = await storage
                  .bucket(bucketName)
                  .file("imp_docs.txt")
                  .getMetadata();

                console.log(`File: ${metadata.name}`);
                console.log(`Bucket: ${metadata.bucket}`);
                console.log(`Storage class: ${metadata.storageClass}`);
                console.log(`Self link: ${metadata.selfLink}`);
                console.log(`ID: ${metadata.id}`);
                console.log(`Size: ${metadata.size}`);
                console.log(`Updated: ${metadata.updated}`);
                console.log(`Generation: ${metadata.generation}`);
                console.log(`Metageneration: ${metadata.metageneration}`);
                console.log(`Etag: ${metadata.etag}`);
                console.log(`Owner: ${metadata.owner}`);
                console.log(`Component count: ${metadata.component_count}`);
                console.log(`Crc32c: ${metadata.crc32c}`);
                console.log(`md5Hash: ${metadata.md5Hash}`);
                console.log(`Cache-control: ${metadata.cacheControl}`);
                console.log(`Content-type: ${metadata.contentType}`);
                console.log(
                  `Content-disposition: ${metadata.contentDisposition}`
                );
                console.log(`Content-encoding: ${metadata.contentEncoding}`);
                console.log(`Content-language: ${metadata.contentLanguage}`);
                console.log(`Media link: ${metadata.mediaLink}`);
                console.log(`KMS Key Name: ${metadata.kmsKeyName}`);
                console.log(`Temporary Hold: ${metadata.temporaryHold}`);
                console.log(`Event-based hold: ${metadata.eventBasedHold}`);
                console.log(
                  `Effective Expiration Time: ${metadata.effectiveExpirationTime}`
                );
                console.log(`Metadata: ${metadata.metadata}`);
              }

              getMetadata().catch(console.error);

              // bucket.upload(
              //   `C:\Users\Suman\Documents\imp_docs.txt`,
              //   (err, file, apiResponse) => {
              //     //Do Stuff
              //   }
              // );
            });
          } else {
            // MongoClient.close();
            return {
              result: { errorText: "Invalid email", isValid: false },
              status: "success"
            };
          }
        });
    } else {
      // MongoClient.close();
      return { result: "Not Valid Data" };
    }
  });
};

module.exports = files;
