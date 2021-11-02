const express = require("express");
const router = express.Router();
const seedUsers = require("../seedData/seedUsers");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

//! SEED

router.get("/seed", async (req, res) => {
  await Users.deleteMany({});
  // console.log(seedUsers);

  seedUsers.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  const seededUsers = await Users.create(seedUsers);

  res.json(seededUsers);
});

//! INDEX

router.get("/", async (req, res) => {
  const allUsers = await Users.find({});

  res.json(allUsers);
});

//! SHOW

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const thisUser = await Users.findById(id).populate('cars_for_rent');

  res.json(thisUser);
});

//! CREATE

router.post("/new", async (req, res) => {
  const newUserData = req.body;
  newUserData.password = bcrypt.hashSync(
    newUserData.password,
    bcrypt.genSaltSync(10)
  );

  const newUser = await Users.create(newUserData);

  // res.json(newUser);
  res.json("Success");
});

//! EDIT

//! UPDATE

//! DESTROY

module.exports = router;
