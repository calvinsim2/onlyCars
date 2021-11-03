const mongoose = require("mongoose");

const carRentalEventsSchema = mongoose.Schema({
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    car_rented: {type: mongoose.Schema.Types.ObjectId, ref:"Cars", required: true},
    original_owner: {type: mongoose.Schema.Types.ObjectId, ref:"Users", required: true},
    owner_confirmation: {type: Boolean, default: false}
})

const CarRentalEvents = mongoose.model("CarRentalEvents", carRentalEventsSchema);

module.exports = CarRentalEvents;