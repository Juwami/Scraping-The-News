var express = require("express");


var router = express.Router();

router.get("/", function(req, res) {
    res.render("index")
})

router.get("/scrape", function(req, res) {
    axios.get("https://news.google.com/topics/CAAqEQgKIgtDQklTQWdnR0tBQVAB?hl=en-US&gl=US&ceid=US%3Aen").then(function(response) {
        var $ = cheerio.load(response.data)
        
        $("a.VDXfz").each(function(i, element) {
            var result = {};
        })
    })
})

module.exports = router