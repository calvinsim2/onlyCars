const express = require("express");
const router = express.Router();
const seedCars = require("../seedData/seedCars");
const Cars = require("../models/cars");

//! SEED

router.get("/seed", async (req, res) => {
    await Cars.deleteMany({});
    console.log(seedCars);
    const seededCars = await Cars.create(seedCars);
    
    res.json(seededCars);
})

//! INDEX

router.get("/", async (req, res) => {
    const allCars = await Cars.find({});
    
    res.json(allCars);
})


//! SHOW
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const thisCar = await Cars.findById(id);
    res.json(thisCar);
  })


//! CREATE not working
router.post("/new", async (req, res) => {
    console.log("data", req.body);
    const cars = await Cars.create(req.body);
    res.json(cars);
  });


//! EDIT
//React route to edit page


//! UPDATE
router.put("/:id/edit", async (req, res) => {
    const { id } = req.params; 
    const car = await Cars.findByIdAndUpdate(id, req.body)
    res.json(car)
  })


//! DESTROY
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Cars.findByIdAndDelete(id);
      res.json(result);
    } catch (error) {
      res.json({ error });
    }
  });
  

module.exports = router;