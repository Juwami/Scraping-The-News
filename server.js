var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars")
var mongoose = require("mongoose");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


var PORT = process.env.PORT || 8000;
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/controller");

app.use(routes);

app.listen(PORT, function() {
    console.log("App listening on port" + PORT)
});

