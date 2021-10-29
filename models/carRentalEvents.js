const mongoose = require("mongoose");

const carRentalEventsSchema = mongoose.Schema({
    date_start: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    car_rented: {type: mongoose.Schema.Types.ObjectId, ref:"Cars"},
    original_owner: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
})

const CarRentalEvents = mongoose.model("CarRentalEvents", carRentalEventsSchema);

module.exports = CarRentalEvents;