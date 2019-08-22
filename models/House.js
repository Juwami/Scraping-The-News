var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HouseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

var House = mongoose.model("House", HouseSchema);

module.exports = House;