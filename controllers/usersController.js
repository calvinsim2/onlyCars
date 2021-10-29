const express = require("express");
const router = express.Router();
const seedUsers = require("../seedData/seedUsers")
const Users = require("../models/users");

router.get("/seed", async (req, res) => {
    await Users.deleteMany({});
    console.log(seedUsers);
    const seededUsers = await Users.create(seedUsers);
    
    res.send(seededUsers);
})

module.exports = router;