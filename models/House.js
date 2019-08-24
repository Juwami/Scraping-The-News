var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HouseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean, default: 0,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
    // ,
    // image: {
    //     type: String,
    //     required: true
    // }
});

var House = mongoose.model("House", HouseSchema);

module.exports = House;