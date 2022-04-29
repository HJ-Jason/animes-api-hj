var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var animeRouter = require("./routes/animes");
var cors = require("cors");
var app = express();

app.use(cors());

var mongoose = require("mongoose");

var connexionStringLocal =
  "mongodb+srv://Jason:pJitdQqZekQy9fjl@animesdatabase.82tpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var mongodb = process.env.MONGO_URI || connexionStringLocal;
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/animes", animeRouter);

module.exports = app;
