const express = require("express");
const router = express.Router();
const seedCars = require("../seedData/seedCars");
const Cars = require("../models/cars");

router.get("/seed", async (req, res) => {
    await Cars.deleteMany({});
    console.log(seedCars);
    const seededCars = await Cars.create(seedCars);
    
    res.json(seededCars);
})

router.get("/", async (req, res) => {
    const allCars = await Cars.find({});
    
    res.json(allCars);
})

module.exports = router;