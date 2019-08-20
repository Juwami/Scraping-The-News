var express = require("express");
var exphbs = require("express-handlebars")
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");


var PORT = process.env.PORT || 8000;
var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/controller");

app.get("/scrape", function(req, res) {
    axios.get("https://news.google.com/topics/CAAqEQgKIgtDQklTQWdnR0tBQVAB?hl=en-US&gl=US&ceid=US%3Aen").then(function(response) {
        var $ = cheerio.load(response.data)
        
        $("a.VDXfz").each(function(i, element) {
            var result = {};
        })
    })
})

app.use(routes);

app.listen(PORT, function() {
    console.log("App listening on port" + PORT)
});

