const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../models/users");

router.get("/", (req, res) => {
  if (req.session.loginUser) {
    res.send(req.session);
  } else res.send("you fucked up, try logging in");
});

router.post("/new", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const thisUser = await Users.findOne({ username: username });

  if (!!thisUser === false) return res.send("No such user");

  const passwordCorrectBool = await bcrypt.compare(password, thisUser.password);

  if (passwordCorrectBool === true) {
    req.session.loginUser = thisUser;
    console.log("new session: ", req.session);
    res.send("Success");
  } else return res.send("wrong password my dude.");
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
    // res.send("session deleted");
  });
});

module.exports = router;
