const express = require("express");
const router = express.Router();
const CarRentalEvents = require("../models/carRentalEvents");

//! INDEX

router.get("/", async (req, res) => {
    const allRentalEvents = await CarRentalEvents.find({});
    
    res.json(allRentalEvents);
})


//! SHOW


//! CREATE


//! EDIT


//! UPDATE


//! DESTROY

module.exports = router;