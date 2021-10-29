const express = require("express");
const router = express.Router();
const Reviews = require("../models/reviews");

//! INDEX

router.get("/", async (req, res) => {
    const allReviews = await Reviews.find({});
    
    res.json(allReviews);
})


//! SHOW


//! CREATE


//! EDIT


//! UPDATE


//! DESTROY

module.exports = router;