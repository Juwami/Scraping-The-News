var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var router = express.Router();

var db = require("../models");

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

module.exports = router