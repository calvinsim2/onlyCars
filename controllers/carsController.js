const express = require("express");
const router = express.Router();
const seedCars = require("../seedData/seedCars");
const Cars = require("../models/cars");
const Users = require("../models/users")


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
    const car = await Cars.findById(id);
    res.json(car);
  })


//! CREATE 
router.post("/new", async (req, res) => {
    req.body.key_features = req.body.key_features.split(",");
    // console.log("data", req.body);
    // console.log("original owner ", req.body.original_owner)
    // console.log("car_id ",req.body._id )
    const id = req.body.original_owner
    const cars = await Cars.create(req.body);
    const carID = await Cars.find(req.body, "_id");
    console.log("car id", carID);
    const user = await Users.findByIdAndUpdate(id, {$push:{cars_for_rent: carID }});
    console.log(user);
    res.json(cars);
  });


//! EDIT
//React route to edit page


//! UPDATE
router.put("/:id", async (req, res) => {
    const { id } = req.params; 
    req.body.key_features = req.body.key_features.split(",");
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