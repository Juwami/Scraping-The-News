var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars")
var mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/CharlotteHomes";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

var PORT = process.env.PORT || 8000;
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static("models"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./controllers/controller")(app)

app.listen(PORT, function() {
    console.log("App listening on port" + PORT)
});

