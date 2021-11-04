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
    // console.log("id", id);
    const thisCar = await Cars.findById(id).populate("original_owner");
    // console.log("thisCar", thisCar);
    res.json(thisCar);
  })

//! CREATE 
router.post("/new", async (req, res) => {
    req.body.key_features = req.body.key_features.toString().split(",");
    req.body.images = req.body.images.toString().split(",");
    // console.log("data", req.body);
    // console.log("original owner ", req.body.original_owner)
    // console.log("car_id ",req.body._id )
    const id = req.body.original_owner
    console.log("Finding Id on create route", id)
    const cars = await Cars.create(req.body);
    const carID = await Cars.find(req.body, "_id");
    console.log("car id", carID);
    const user = await Users.findByIdAndUpdate(id, {$push:{cars_for_rent: carID }});
    console.log(user);
    res.json(cars);
  });


//! EDIT
// router.get("/:id/edit", async (req, res) => {
//     const { id } = req.params;
//     const thisCar = await Cars.findById(id);
//     res.json(thisCar);
//   })


//! UPDATE
router.put("/:id", async (req, res) => {
    req.body.images = req.body.images.toString().split(",");
    req.body.key_features = req.body.key_features.toString().split(",");
    const  {id}  = req.params; 
    const car = await Cars.findByIdAndUpdate(id, req.body)
    res.json(car)
  })


//! DESTROY
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const originalOwner = await Cars.findById(id, "original_owner")
      const userIDnumber = await originalOwner._id.toString();
      console.log("original owner", userIDnumber);
      const result = await Cars.findByIdAndDelete(id);
      const user = await Users.findByIdAndUpdate( userIDnumber , {$pull:{cars_for_rent: id }});
      res.json(result);
    } catch (error) {
      res.json({ error });
    }
  });
  

module.exports = router;