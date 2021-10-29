const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
    rating: {type: Number, required: true, min: 0, max: 10},
    comment: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    car_rented: {type: mongoose.Schema.Types.ObjectId, ref:"Cars"}
})

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;