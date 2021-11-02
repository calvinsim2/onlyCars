const express = require("express");
const router = express.Router();
const CarRentalEvents = require("../models/carRentalEvents");

//! INDEX

router.get("/", async (req, res) => {
    const allRentalEvents = await CarRentalEvents.find({});
    
    res.json(allRentalEvents);
})


//! SHOW
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const car = await CarRentalEvents.findById(id);
    res.json(car);
  })


//! CREATE
router.post("/new", async (req, res) => {
    console.log("data", req.body);
    const cars = await CarRentalEvents.create(req.body);
    res.json(cars);
  });



//! EDIT
//React route to edit page

//! UPDATE
router.put("/:id", async (req, res) => {
    const { id } = req.params; 
    const car = await CarRentalEvents.findByIdAndUpdate(id, req.body)
    res.json(car)
  })



//! DESTROY
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await CarRentalEvents.findByIdAndDelete(id);
      res.json(result);
    } catch (error) {
      res.json({ error });
    }
  });

module.exports = router;