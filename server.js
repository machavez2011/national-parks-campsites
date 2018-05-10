const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongo = require("./app/mongodb");
const router = require("./app/routes");
const https = require("https");

dotenv.config();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("withCredentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Cookie, x-access-token"
  );
  next();
});

// function middleware(req, res) {
//     res.status(200).json("Hello World")
// }

//app.use("/", middleware);

// app.post("/", function(req, res) {
//     res.status(200).json(req.body);
// });

app.use(router);

mongo
  .connect(process.env.MONGODB_URL)
  .then(initializeServer)
  .then(() => console.log(`Magic happens on port: ${port}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

function initializeServer() {
  if (process.env.HTTPS === "true") {
    return https.createServer(httpsOptions, app).listen(port);
  } else {
    return app.listen(port);
  }
}

//app.listen(3000);
