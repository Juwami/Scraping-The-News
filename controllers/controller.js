var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (data) {
                var hbsObject = {
                    home: data
                };
                console.log(hbsObject)
                res.render("index", hbsObject)
            })
    })

    app.get("/scrape", function (req, res) {
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
                result.image = $(this)
                    .find("div.thumbnail_image")
                    .find("a")
                    .find("img.thumbnail-image.lazy")
                    .attr("src");
                
                    console.log(result.image)

                db.House.create(result)
                    // .then(function (house) {
                    //     console.log(house)
                    // })
                    .catch(function (err) {
                        console.log(err)
                    })
            })
            res.send("Houses in Charlotte Scraped")
        })
    })

}