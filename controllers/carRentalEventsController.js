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
    const thisRentalEvent = await CarRentalEvents.findById(id);
    res.json(thisRentalEvent);
  })


//! CREATE
router.post("/new", async (req, res) => {
    console.log("data", req.body);
    const newRentalEvent = await CarRentalEvents.create(req.body);
    res.json(newRentalEvent);
  });



//! EDIT
//React route to edit page

//! UPDATE
router.put("/:id", async (req, res) => {
    const { id } = req.params; 
    const thisRentalEvent = await CarRentalEvents.findByIdAndUpdate(id, req.body);
    res.json(thisRentalEvent);
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