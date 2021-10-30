const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
    brand: {type: String, required: true, trim: true},
    model: {type: String, required: true, trim: true},
    original_owner: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    rented_to_user: {type: mongoose.Schema.Types.ObjectId, ref:"Users"},
    rental_rate: {type: Number, required: true, min:0},
    rented_days: Number,
    mileage: Number,
    horsepower: Number,
    fuel_consumption: Number,
    estimated_range: Number,
    manual: Boolean,
    fuelType: {type: String, required: true},
    images: [ String ],
    key_features: [ String ],
    reviews: [ {type: mongoose.Schema.Types.ObjectId, ref:"Reviews"} ]
})

const Cars = mongoose.model("Cars", carsSchema);

module.exports = Cars;