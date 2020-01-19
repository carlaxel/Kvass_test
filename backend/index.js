const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv-flow").config();

const app = express();
const pictureS3 = require("./routes/pictureS3");

if (dotenv.error) {
  throw dotenv.error;
}
console.log(dotenv.parsed);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api-v1", pictureS3);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
