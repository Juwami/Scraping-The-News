var express = require("express");
var exphbs = require("express-handlebars")
var mongoose = require("mongoose");


var PORT = process.env.PORT || 8000;
var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("App listening on port" + PORT)
});

