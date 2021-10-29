const express = require("express");
const router = express.Router();
const seedUsers = require("../seedData/seedUsers")
const Users = require("../models/users");

router.get("/seed", async (req, res) => {
    await Users.deleteMany({});
    // console.log(seedUsers);
    const seededUsers = await Users.create(seedUsers);
    
    res.json(seededUsers);
})

router.get("/", async (req, res) => {
    const allUsers = await Users.find({});

    res.json(allUsers);
})

module.exports = router;