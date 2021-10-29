const mongoose = require("mongoose");

const carRentalEventsSchema = mongoose.Schema({

})

const CarRentalEvents = mongoose.model("CarRentalEvents", carRentalEventsSchema);

module.exports = CarRentalEvents;