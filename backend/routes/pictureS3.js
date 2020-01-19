const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();
const S3 = new AWS.S3();

router.use((req, res, next) => {
  console.log("reached 'API-v1 main'");
  next();
});

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: process.env.BUCKET,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      console.log(file.originalname);
      cb(null, file.originalname);
    }
  })
});

router.post("/uploadPicture", upload.single("image"), (req, res) => {
  console.log(req.body);

  res.status(200).json("upload complete");
});

router.post("/fetchPicture", async (req, res) => {
  console.log(req.body);

  var params = {
    Bucket: "kvass",
    Key: req.body.Key
  };
  let data = await S3.getObject(params).promise();
  console.log(data);
  res.status(200).json(data);
});

router.get("/listObjects", async (req, res) => {
  let params = {
    Bucket: "kvass",
    MaxKeys: 100
  };
  let list = await S3.listObjectsV2(params).promise();
  console.log(list);
  res.status(200).json(list);
});

module.exports = router;
