var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {


    
    router.get("/", function (req, res) {
        res.render("index")
})

router.get("/scrape", function (req, res) {
    axios.get("https://www.charlotteagenda.com/tag/open-houses/").then(function (response) {
        var $ = cheerio.load(response.data)
        
        $("div.indexstory").each(function (i, element) {
            var result = {};
            
            result.title = $(this)
            .find("div.entry-item")
            .find("h1.entry-title")
            .find("a")
            .text();
            result.link = $(this)
            .find("div.entry-item")
            .find("h1.entry-title")
            .find("a")
            .attr("href");
            result.excerpt = $(this)
            .find("div.excerpt.fullview")
            .text();
            result.postDate = $(this)
            .find("div.entry-meta.fullview")
            .find("div.byline-author")
            .find("div.dateviews")
            .find("div.bylinedate")
            .text();
            
            db.Article.create(result)
            .then(function (house) {
                console.log(house)
            })
            .catch(function (err) {
                console.log(err)
            })
        })
        res.send("Houses in Charlotte Scraped")
    })
})

}